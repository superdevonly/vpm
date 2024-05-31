"use server";
import {
  addAssetToDynamodb,
  addLivepeerVideoToUser,
  decrementUserCredits,
} from "@/lib/dynamodb";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_LIVEPEER_API_KEY;

async function uploadVideoToLivepeer(
  video: string,
  fileName: string,
  userId: string,
  routeId: string,
  artistName: string
) {
  try {
    let arrayBuffer;
    if (routeId === "live") {
      const response = await fetch(video);
      arrayBuffer = await response.arrayBuffer();
    } else {
      arrayBuffer = Uint8Array.from(atob(video), (c) => c.charCodeAt(0)).buffer;
    }
    // Decode the base64 video data to ArrayBuffer

    // Generate a random 256-bit key
    const key = await crypto.subtle.generateKey(
      {
        name: "AES-CBC",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );

    // Export the key as raw data
    const keyData = await crypto.subtle.exportKey("raw", key);

    // Encode the key in Base64
    // const keyBase64 = btoa(
    //   String.fromCharCode(...Array.from(new Uint8Array(keyData)))
    // );

    const iv = crypto.getRandomValues(new Uint8Array(16));

    const encrypted = await crypto.subtle.encrypt(
      {
        name: "AES-CBC",
        iv: iv,
      },
      key,
      arrayBuffer
    );

    // Concatenate IV and encrypted file into a new ArrayBuffer
    const ivArray = Array.from(iv);
    const encryptedArray = Array.from(new Uint8Array(encrypted));
    const resultArray = ivArray.concat(encryptedArray);
    const resultBuffer = new Uint8Array(resultArray).buffer;

    const blob = new Blob([resultBuffer], { type: "application/octet-stream" });

    // Fetch the public key from Livepeer
    const publicKeyResponse = await fetch(
      "https://livepeer.studio/api/access-control/public-key",
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const publicKeyData = await publicKeyResponse.json();

    // Decode the SPKI public key from base64 and convert it to a buffer
    const spkiPublicKey = atob(publicKeyData.spki_public_key);
    const publicKeyBuffer = Uint8Array.from(atob(spkiPublicKey), (c) =>
      c.charCodeAt(0)
    ).buffer;

    // Import the public key
    const publicKeyObj = await crypto.subtle.importKey(
      "spki",
      publicKeyBuffer,
      {
        name: "RSA-OAEP",
        hash: { name: "SHA-256" },
      },
      false,
      ["encrypt"]
    );

    // Encrypt the key data with the public key
    const encryptedKeyData = await crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      publicKeyObj,
      keyData
    );

    // Base64 encode the encrypted key data
    const encryptedKeyBase64 = btoa(
      String.fromCharCode(...Array.from(new Uint8Array(encryptedKeyData)))
    );

    const response = await fetch(
      "https://livepeer.studio/api/asset/request-upload",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fileName,
          creatorId: userId,
          encryption: {
            encryptedKey: encryptedKeyBase64,
          },
          playbackPolicy: {
            type: "public",
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error requesting upload URL");
    }

    const data = await response.json();

    // Upload the encrypted file to the returned URL
    const uploadResponse = await fetch(data.url, {
      method: "PUT",
      body: blob,
    });

    //TODO add reverting user credits if one of below call fails
    if (uploadResponse.ok) {
      if (routeId === "app") {
        console.log("Video uploaded successfully to Livepeer");
        await decrementUserCredits(userId, "video");
        await addLivepeerVideoToUser(userId, data.asset.id);
        return { uploadstatus: "success" };
      } else {
        return await addAssetToDynamodb(1, artistName, data.asset.id, "video");
      }
    } else {
      throw new Error("Error uploading video to Livepeer");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { video, fileName, userId, routeId, artistName } = body;

  const result = await uploadVideoToLivepeer(
    video,
    fileName,
    userId,
    routeId,
    artistName
  );

  return new NextResponse(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
