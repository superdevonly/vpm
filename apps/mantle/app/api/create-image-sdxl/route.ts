"use server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { ImageRatio } from "@repo/utils/types";

const createImageSdxl = async (
  finalPrompt: string,
  imageRatio: ImageRatio
): Promise<any> => {
  const ratio =
    imageRatio === "horizontal"
      ? {
          width: 1216,
          height: 832,
        }
      : imageRatio === "square"
        ? {
            width: 1024,
            height: 1024,
          }
        : imageRatio === "vertical"
          ? {
              width: 832,
              height: 1216,
            }
          : {
              width: 1024,
              height: 1024,
            };

  try {
    const response = await axios.post(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
      JSON.stringify({
        text_prompts: [
          {
            text: finalPrompt,
          },
        ],
        cfg_scale: 7,
        height: ratio.height,
        width: ratio.width,
        steps: 30,
        samples: 1,
      }),
      {
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return { base64Image: response.data.artifacts[0].base64 };
  } catch (error: any) {
    console.error("Error creating image sdxl:", error.response.data);
    throw error;
  }
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { finalPrompt, imageRatio } = body;
  const result = await createImageSdxl(finalPrompt, imageRatio);

  return new NextResponse(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
