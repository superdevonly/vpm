import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { ImageRatio } from "@repo/utils/types";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

const createImageDalle = async (
  finalPrompt: string,
  imageRatio: ImageRatio
): Promise<string> => {
  const ratio =
    imageRatio === "horizontal"
      ? "1792x1024"
      : imageRatio === "square"
        ? "1024x1024"
        : imageRatio === "vertical"
          ? "1024x1792"
          : "1024x1024";
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        prompt: finalPrompt,
        model: "dall-e-3",
        n: 1,
        size: ratio,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const imageUrl = response.data.data[0];
    return imageUrl;
  } catch (error: any) {
    console.error(
      "Error creating image dalle:",
      error.response?.data || error.message
    );
    throw new Error("Error creating image with DALL·E");
  }
};
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { finalPrompt, imageRatio } = body;
  const result = await createImageDalle(finalPrompt, imageRatio);

  return new NextResponse(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
