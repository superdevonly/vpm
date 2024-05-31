import fetch from "node-fetch";
import { getAssetIdsForUser } from "./dbHelpers";
import { Livepeer } from "livepeer";
import { LivepeerAsset } from "@/utils/types";
import { unstable_cache } from "next/cache";
import { cache } from "react";

const livepeer = new Livepeer({
  apiKey: process.env.NEXT_PUBLIC_LIVEPEER_API_KEY!,
});

const createLivestream = async (streamName: string) => {
  const streamData = {
    name: streamName,
  };
  try {
    const response = await livepeer.stream.create(streamData);
    if (response.statusCode == 201) {
      console.log("Stream created:", response);
      return "Stream created:";
    }
  } catch (error) {
    console.error("Error creating stream:", error);
  }
};

export const getAllLivestream = async () => {
  return await livepeer.stream.getAll();
};
export const getLivepeerAssetDetails = async (assetId: string) => {
  return await livepeer.asset.get(assetId);
};

export const createLivepeerAsset = async (metadata: any) => {
  return await livepeer.asset.create(metadata);
};

async function fetchLivepeerAssetDetails(
  assetId: string,
  apiKey: string
): Promise<LivepeerAsset> {
  if (!assetId) {
    throw new Error("Asset ID is undefined or null");
  }

  if (!apiKey) {
    throw new Error("API Key is undefined or null");
  }

  const url = `https://livepeer.com/api/asset/${assetId}`;
  const headers = { Authorization: `Bearer ${apiKey}` };
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error("Failed to fetch asset details from Livepeer");
  }

  return response.json() as Promise<LivepeerAsset>; // Type assertion
}

export const fetchUserVideoAssets = async (userId: string) => {
  const apiKey = process.env.NEXT_PUBLIC_LIVEPEER_API_KEY!;

  if (!apiKey) {
    throw new Error("Livepeer API Key is not defined");
  }

  const assetIds = await getAssetIdsForUser(userId);

  const validAssetIds = assetIds.filter(
    (assetId) => typeof assetId === "string"
  ); // Filter out non-string values
  const assets = await Promise.all(
    validAssetIds.map((assetId: string) =>
      fetchLivepeerAssetDetails(assetId, apiKey)
    )
  );

  return assets.map(({ id, playbackId }: LivepeerAsset) => ({
    id,
    playbackId,
    userId,
    type: "video",
  }));
};

// async function someFunctionToHandleAssets(userId: string) {
//   try {
//     const assetIds = await getAssetIdsForUser(userId);
//     // Do something with the asset IDs, like fetching more details from Livepeer
//   } catch (error) {
//     console.error('Error fetching asset IDs:', error);
//     // Handle the error appropriately
//   }
// }

export const uploadAssetViaUrl = async (metadata: any) => {
  return await livepeer.asset.createViaURL(metadata);
};

const getPlaybackInfoUncached = cache(async (playbackId: string) => {
  try {
    const playbackInfo = await livepeer.playback.get(playbackId);

    if (!playbackInfo.playbackInfo) {
      console.error("Error fetching playback info", playbackInfo);

      return null;
    }

    return playbackInfo.playbackInfo;
  } catch (e) {
    console.error(e);
    return null;
  }
});

export const getPlaybackInfo = unstable_cache(
  async (playbackId: string) => getPlaybackInfoUncached(playbackId),
  ["get-playback-info"],
  {
    revalidate: 120,
  }
);
