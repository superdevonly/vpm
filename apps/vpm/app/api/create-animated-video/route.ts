import { NextRequest, NextResponse } from "next/server";
import { ImageRatio } from "@repo/utils/types";
import * as fal from "@fal-ai/serverless-client";
import { FalVideoResponse, createVideoType } from "@/utils/types";

fal.config({
  credentials: process.env.FAL_API_KEY,
});

const createAnimatedVideo = async (
  finalPrompt: string,
  imageRatio: ImageRatio
): Promise<createVideoType> => {
  const ratio =
    imageRatio === "horizontal"
      ? "landscape_16_9"
      : imageRatio === "square"
        ? "square"
        : imageRatio === "vertical"
          ? "portrait_16_9"
          : "square";

  try {
    const result = (await fal.subscribe(
      "fal-ai/fast-animatediff/text-to-video",
      {
        input: {
          prompt: finalPrompt,
          num_frames: 16,
          num_inference_steps: 25,
          guidance_scale: 7.5,
          fps: 8,
          video_size: ratio,
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            // update.logs.map((log) => log.message).forEach(console.log);
            console.log("in progress");
          }
        },
      }
    )) as FalVideoResponse;

    if (result.video) {
      return {
        isSuccess: true,
        videoUrl: result.video.url,
        message: "Video generated successfully!",
      };
    } else {
      return {
        isSuccess: false,
        videoUrl: "",
        message: "Server error!",
      };
    }
  } catch (error) {
    console.error("Error generating image:", error);
    return { isSuccess: false, videoUrl: "", message: "No video generated !" };
  }
};
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { firstParam, imageRatio } = body;
  const result = await createAnimatedVideo(firstParam, imageRatio);
  if (result.isSuccess) {
    return new NextResponse(JSON.stringify({ videoUrl: result.videoUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new NextResponse(JSON.stringify({ error: result.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
