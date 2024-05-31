import { LivePeerPlayer } from "@/components/livepeer-player";
import { getUserLivepeerVideos } from "@/lib/dynamodb";
import { getLivepeerAssetDetails } from "@/lib/livepeer";
import { getPrivyUser } from "@/lib/privy";
import { cookies } from "next/headers";

const populateVideos = async (items: any) => {
  const promises = items.map(async (item: any) => {
    return (await getLivepeerAssetDetails(item.assetID)).asset;
  });

  const videos = await Promise.all(promises);
  return videos; // Now 'videos' is an array of all itemDetails, fully populated
};

const getVideos = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("privy-token")?.value;
  try {
    // console.log("TOKEN>>", token);
    if (!token) return null;
    const user = await getPrivyUser(token);
    // console.log("USER>>", user);
    const livepeerVideos = await getUserLivepeerVideos(user.userId);

    // console.log("VIDEOS DYNAMO>>", livepeerVideos);

    if (livepeerVideos?.length === 0) {
      return null;
    }

    const videos = await populateVideos(livepeerVideos);
    console.log("DETAILS vid>>", videos);

    return videos;
  } catch (error) {
    console.log("image ERROR", error);
  }
};

const VideosGallery = async () => {
  const videos = await getVideos();

  return (
    <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {videos &&
        videos.map((video: any) => (
          <div className="overflow-hidden rounded-lg" key={video.id}>
            <LivePeerPlayer
              key={video.id}
              url={video.playbackUrl}
              title={video.name}
            />
          </div>
        ))}
    </div>
  );
};

export default VideosGallery;
