import { NextRequest, NextResponse } from "next/server";
import { ImageRatio } from "@repo/utils/types";
import * as fal from "@fal-ai/serverless-client";

fal.config({
  credentials: process.env.FAL_API_KEY,
});

const createImageCascade = async (
  finalPrompt: string,
  imageRatio: ImageRatio
): Promise<any> => {
  const ratio =
    imageRatio === "horizontal"
      ? "landscape_16_9"
      : imageRatio === "square"
        ? "square"
        : imageRatio === "vertical"
          ? "portrait_16_9"
          : "square";

  try {
    const result: any = await fal.subscribe("fal-ai/stable-cascade", {
      input: {
        prompt: finalPrompt,
        first_stage_steps: "20",
        second_stage_steps: "10",
        guidance_scale: "4",
        image_size: ratio,
      },
    });

    if (result.images && result.images.length > 0) {
      return { imageUrl: result.images[0].url };
    } else {
      return { error: "No image generated" };
    }
  } catch (error) {
    console.error("Error generating image:", error);
    return { error: "Server error" };
  }
};
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { finalPrompt, imageRatio } = body;
  const result = await createImageCascade(finalPrompt, imageRatio);
  return new NextResponse(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
