import { useUserCreditsStore } from "@/lib/store";
import { usePrivy } from "@privy-io/react-auth";
import { useCallback, useEffect, useState } from "react";
import SaveModal from "../save-modal";
import { VideoResult } from "../video-result";
import Button from "@repo/ui/button";
import { ImageRatioSelector } from "./image-ratio-selector";
import { ImageStyleSelector } from "./image-style-selector";
import { fetchData } from "@repo/utils/fetch-data";
import { ImageRatio, ImageStyle } from "@repo/utils/types";
import { decrementUserCredits } from "@/lib/dynamodb";
import { CreateImageProps } from "@/utils/types";
import { useAppContext } from "@/context/AppContext";

const CreateImage = ({ routeId }: CreateImageProps) => {
  const [videoId, setVideoId] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [creatingVideo, setCreatingVideo] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = usePrivy();
  const [progress, setProgress] = useState(0); // Progress of the timer
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [itemsLimitReached, setItemsLimitReached] = useState(false);
  const [imageRatio, setImageRatio] = useState<null | ImageRatio>(null);
  const [imageStyle, setImageStyle] = useState<null | ImageStyle>(null);
  const [isDisableSaveToButton, setIsDisableSaveToButton] = useState(false);
  const { userVideoCredits, setUserImageCredits } = useUserCreditsStore();
  const { mode, finalPrompt, setImageUrl, imageUrl } = useAppContext();
  const { song } = useAppContext();

  useEffect(() => {
    if (routeId === "live") setImageRatio("horizontal");
  }, [routeId]);
  const base64ToImageUrl = (base64Image: string) => {
    return `data:image/png;base64,${base64Image}`;
  };

  const handleCreateImage = useCallback(
    async (imageRatio: ImageRatio, imageStyle: ImageStyle) => {
      setLoadingImage(true);
      setProgress(0);
      setErrorMessage("");
      try {
        // Simulate a delay to show progress bar for demonstration
        const simulateDelay = (ms: number) =>
          new Promise((resolve) => setTimeout(resolve, ms));
        for (let i = 1; i <= 10; i++) {
          await simulateDelay(1500); // Simulate a 1.5 second delay for each 10% progress
          setProgress(i * 10); // Update progress
        }
        let param;
        imageStyle == "animated"
          ? (param = "dalle")
          : imageStyle == "realistic"
            ? (param = "sdxl")
            : (param = "cascade");
        let imageData;
        param === "sdxl"
          ? (imageData = { finalPrompt, imageRatio, routeId })
          : (imageData = { finalPrompt, imageRatio });

        const data = await fetchData(
          `/api/create-image-${param}`,
          "POST",
          imageData
        );

        if (imageStyle === "realistic") {
          if (routeId === "app" && data.base64Image) {
            setImageUrl(base64ToImageUrl(data.base64Image));
          } else {
            setImageUrl(data.imageUrl);
          }
        } else if (imageStyle === "animated" && data.url) {
          setImageUrl(data.url);
        } else if (imageStyle === "cascade" && data.imageUrl) {
          setImageUrl(data.imageUrl);
        } else {
          setErrorMessage("No image data received");
        }

        if (user && routeId === "app") {
          const userCreditsRes = await decrementUserCredits(user.id, "image");
          setUserImageCredits(userCreditsRes?.imageCredits);

          if (userCreditsRes?.imageCredits <= 0) {
            setItemsLimitReached(true);
          }
        }
      } catch (error) {
        console.error("Error creating image:", error);
        setErrorMessage("Error creating image");
      } finally {
        setLoadingImage(false);
        setProgress(100);
      }
    },
    [user, routeId]
  );

  const handleSaveToGallery = useCallback(async () => {
    if (!imageUrl) {
      alert("Please select an image or video to save.");
      return;
    }
    if (!user) {
      alert("User not authenticated. Please log in.");
      return;
    }
    setIsSaving(true);
    try {
      const response = await fetch("/api/save-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          imageUrl,
          isVideo: false,
          routeId: routeId,
          artistName: mode,
          songId: song,
        }),
      });
      if (response.ok) {
        if (routeId === "app") {
          setOpenSaveModal(true);
        }
        setIsDisableSaveToButton(true);
      }
    } catch (error) {
      console.error("Error saving to gallery:", error);
      alert("Oops! Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  }, [imageUrl, user, mode, song, routeId]);

  const handleCreateVideo = useCallback(
    async (videoStyle: string) => {
      try {
        setCreatingVideo(true);
        let endpoint;
        let firstParam;
        if (routeId === "app") {
          if (videoStyle === "unanimated") {
            endpoint = "/api/create-video";
            firstParam = imageUrl;
          } else {
            endpoint = "/api/create-animated-video";
            firstParam = finalPrompt;
          }
        } else {
          endpoint = "/api/create-animated-video";
          firstParam = finalPrompt;
        }

        const data = await fetchData(endpoint, "POST", {
          firstParam,
          imageRatio,
        });

        if (data.videoUrl) {
          setVideoUrl(data.videoUrl);
        } else {
          setVideoId(data.videoId);
        }
      } catch (error) {
        console.error("Error creating video:", error);
        setErrorMessage("Error creating video");
      } finally {
        setCreatingVideo(false);
      }
    },
    [imageUrl, finalPrompt]
  );

  return (
    <div className="flex flex-row flex-wrap justify-center gap-8">
      <div className="flex flex-col">
        {!imageUrl && (
          <div className="flex flex-wrap gap-3 mt-2 md:flex-nowrap">
            <div>
              <ImageStyleSelector
                onClick={setImageStyle}
                selectedStyle={imageStyle!}
                routeId={routeId}
              />
              {routeId == "app" && (
                <ImageRatioSelector
                  onClick={setImageRatio}
                  selectedRatio={imageRatio}
                />
              )}
              <Button
                className="w-full mt-10"
                disabled={
                  !imageStyle ||
                  loadingImage ||
                  (routeId == "app" && !imageRatio)
                }
                onClick={() => {
                  handleCreateImage(imageRatio!, imageStyle!);
                }}
              >
                {loadingImage ? "Generating Image..." : "Generate Image"}
              </Button>
            </div>
          </div>
        )}

        {loadingImage && (
          <div className="w-full my-4 bg-gray-700 rounded-lg">
            <div
              className="p-1 text-xs font-medium leading-none text-center text-white rounded-full bg-primary"
              style={{ width: `${progress}%` }}
            >
              {Math.round(progress)}%
            </div>
          </div>
        )}

        {imageUrl && (
          <div>
            <img
              className="w-[500px] rounded-lg"
              src={imageUrl}
              alt="Generated Image"
            />
            <div className="flex gap-4">
              <Button
                disabled={isSaving || isDisableSaveToButton}
                size="lg"
                className="flex items-center w-full mt-4"
                onClick={handleSaveToGallery}
              >
                {isSaving
                  ? "Saving..."
                  : routeId === "app"
                    ? "Save to Gallery"
                    : "Save to Store"}
              </Button>
              {routeId === "app" && (
                <Button
                  disabled={
                    videoId?.length > 0 ||
                    creatingVideo ||
                    videoUrl !== "" ||
                    (typeof userVideoCredits === "number" &&
                      userVideoCredits <= 0)
                  }
                  size="lg"
                  className="flex items-center w-full mt-4"
                  onClick={() => handleCreateVideo("unanimated")}
                >
                  {typeof userVideoCredits === "number" && userVideoCredits <= 0
                    ? "You've reached video generation limit"
                    : creatingVideo
                      ? "Video creating..."
                      : "Create Video"}
                </Button>
              )}

              {/* <Button
                disabled={
                  videoId?.length > 0 ||
                  creatingVideo ||
                  (typeof userVideoCredits === "number" &&
                    userVideoCredits <= 0)
                }
                size="lg"
                className="flex items-center w-full mt-4"
                onClick={() => handleCreateVideo("animated")}
              >  {typeof userVideoCredits === "number" && userVideoCredits <= 0
                  ? "You've reached video generation limit"
                  : creatingVideo
                    ? "Video creating..."
                    : "Create Video diff"}
              </Button> */}
            </div>
          </div>
        )}
      </div>
      {(videoId || videoUrl) && (
        <VideoResult
          videoId={videoId}
          videoUrl={videoUrl}
          ratio={imageRatio}
          routeId={routeId}
          artistName={mode}
        />
      )}{" "}
      {/* Ensure VideoResult is properly defined */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <SaveModal
        open={openSaveModal}
        limitReached={itemsLimitReached}
        onOpenChange={setOpenSaveModal}
        routeId={routeId}
      />
    </div>
  );
};
export default CreateImage;
