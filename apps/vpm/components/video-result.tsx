import { videoBase64 } from "@/app/video";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import SaveModal from "./save-modal";
import Button from "@repo/ui/button";
import Skeleton from "@repo/ui/skeleton";
import { base64StringToBlob } from "@repo/utils/base64StringToBlob";
import { cn } from "@repo/ui/utils";
import { decrementUserCredits } from "@/lib/dynamodb";
import { useUserCreditsStore } from "@/lib/store";
import { VideoResultProps } from "@/utils/types";

export const VideoResult = ({
  videoId,
  videoUrl,
  ratio,
  routeId,
  artistName,
}: VideoResultProps) => {
  const [, setProgress] = useState(0);
  const [videoStatus, setVideoStatus] = useState("pending");
  const [base64Video, setBase64Video] = useState("");
  const [, setIsGenerating] = useState(false);
  const { user } = usePrivy();
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [itemsLimitReached, setItemsLimitReached] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDisableSaveToButton, setIsDisableSaveToButton] = useState(false);
  const { setUserVideoCredits } = useUserCreditsStore();
  const SkeletonClass =
    ratio === "horizontal"
      ? "h-[342px]"
      : ratio === "vertical"
        ? "h-[730px]"
        : ratio === "square"
          ? "h-[500px]"
          : "h-[500px]";

  let videoBlob = base64StringToBlob(videoBase64, "video/mp4");
  const [url, setUrl] = useState(URL.createObjectURL(videoBlob));

  const updateStatus = async () => {
    if (!videoId) {
      console.error("Video ID is undefined or null.");
      return;
    }
    setIsGenerating(true);

    try {
      const response = await fetch(`/api/video-status?videoId=${videoId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const data = await response.json();

        if (data.status === "complete") {
          setBase64Video(data.video);
          const blob = base64StringToBlob(data.video, "video/mp4");
          const videoUrl = URL.createObjectURL(blob);
          setUrl(videoUrl);
          setVideoStatus("complete");
          if (user) {
            const userCreditsRes = await decrementUserCredits(user.id, "video");
            setUserVideoCredits(userCreditsRes?.videoCredits);
          }
        } else if (data.status === "in-progress") {
          const expectedGenerationTime = 360; // in seconds
          const progressPercent = Math.min(
            100,
            (data.elapsed_time / expectedGenerationTime) * 100
          );
          setProgress(progressPercent);
        }
      } else if (contentType === "video/mp4") {
        videoBlob = await response.blob();
        const url = URL.createObjectURL(videoBlob);
        setProgress(100);
        setUrl(url);
        setVideoStatus("complete");
        if (user) {
          const userCreditsRes = await decrementUserCredits(user.id, "video");
          setUserVideoCredits(userCreditsRes?.videoCredits);
        }
      } else {
        console.error("Unexpected response content type:", contentType);
      }
    } catch (error) {
      console.error("Error:", error);
      setVideoStatus("error");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    let interval: any;
    if (videoUrl !== "" && videoId === "") {
      setUrl(videoUrl);
    } else {
      if (videoStatus === "complete") {
        clearInterval(interval);
      } else {
        interval = setInterval(updateStatus, 10000);
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [videoId, videoStatus, updateStatus]);

  const handleSaveToGallery = async () => {
    if (!user) {
      alert("User not authenticated. Please log in.");
      return;
    }
    setIsSaving(true);
    try {
      const fileName = `video-${Date.now()}_${ratio}.mp4`;
      const userId = user.id;
      let video;
      routeId === "app" ? (video = base64Video) : (video = videoUrl);
      const response = await fetch("/api/upload-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          video,
          fileName,
          userId,
          routeId,
          artistName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (
          data.mp4Count >=
          Number(process.env.NEXT_PUBLIC_USER_VIDEOS_COUNT!) - 1
        ) {
          setItemsLimitReached(true);
        }
        setOpenSaveModal(true);
        setIsDisableSaveToButton(true);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error saving to gallery:", error);
      alert("Oops! Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      {(videoStatus === "complete" && url) || url ? (
        <>
          <video className="w-[500px] rounded-lg" controls src={url}>
            Sorry, your browser doesn't support embedded videos.
          </video>
          <Button
            disabled={isSaving || isDisableSaveToButton}
            size="lg"
            className="flex items-center w-full mt-4"
            onClick={handleSaveToGallery}
          >
            {isSaving
              ? "Video is saving..."
              : routeId === "app"
                ? "Save Video to Gallery"
                : "Save to Video to Store"}
          </Button>
          <SaveModal
            open={openSaveModal}
            limitReached={itemsLimitReached}
            onOpenChange={setOpenSaveModal}
            routeId={routeId}
          />
        </>
      ) : (
        <div>
          <Skeleton
            className={cn(
              "w-[500px] justify-center items-center flex",
              SkeletonClass
            )}
          >
            {videoStatus === "error"
              ? "Error in video processing."
              : "We're doing some AI magic now. Video is being processed..."}
          </Skeleton>
        </div>
      )}
    </div>
  );
};
