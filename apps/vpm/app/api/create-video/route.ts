"use server";
import axios from "axios";
import FormData from "form-data";
import sharp from "sharp";
import { ImageRatio } from "@repo/utils/types";
import { NextRequest, NextResponse } from "next/server";

async function resizeImage(imageUrl: string): Promise<Buffer> {
  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
  return sharp(response.data).resize(768, 768).toFormat("jpeg").toBuffer();
}

const createVideo = async (
  imageUrl: string,
  imageRatio: ImageRatio
): Promise<any> => {
  const ratio = {
    width:
      imageRatio === "horizontal"
        ? 1024
        : imageRatio === "vertical"
          ? 576
          : 768,
    height:
      imageRatio === "horizontal"
        ? 576
        : imageRatio === "vertical"
          ? 1024
          : 768,
  };

  try {
    let imageBuffer: Buffer;

    if (imageUrl.startsWith("data:image")) {
      const base64Data = imageUrl.split(",")[1] ?? "";
      imageBuffer = Buffer.from(base64Data, "base64");
    } else {
      imageBuffer = await resizeImage(imageUrl);
    }

    imageBuffer = await sharp(imageBuffer)
      .resize(ratio.width, ratio.height)
      .toFormat("jpeg")
      .toBuffer();

    const form = new FormData();
    form.append("image", imageBuffer, {
      filename: "image.jpg",
      contentType: "image/jpeg",
    });
    form.append("seed", "0");
    form.append("cfg_scale", "2.5");
    form.append("motion_bucket_id", "40");

    const videoResponse = await axios.post(
      "https://api.stability.ai/v2alpha/generation/image-to-video",
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        },
      }
    );
    console.log(videoResponse);
    return { videoId: videoResponse.data.id };
  } catch (error: any) {
    console.error("Error creating video:", error);
    return { error: `Error creating video: ${error.message}` };
  }
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { firstParam, imageRatio } = body;
  const result = await createVideo(firstParam, imageRatio);
  return new NextResponse(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
