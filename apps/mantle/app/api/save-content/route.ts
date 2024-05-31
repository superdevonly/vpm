import { s3Upload, uploadVideoToS3 } from "@/lib/aws";
import { NextRequest } from "next/server";
import fetch from "node-fetch";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId, imageUrl, isVideo } = body;
  let fileBuffer: any;
  let s3Response;

  if (!isVideo) {
    try {
      const response = await fetch(imageUrl);
      if (response.ok) {
        fileBuffer = await response.buffer();
      }
    } catch (error) {
      console.error(
        "Error in save-content route -> Fetch the image or video:",
        error
      );
      return new Response(
        JSON.stringify({ error: "Internal Server Error", message: error }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    try {
      s3Response = await s3Upload(
        fileBuffer,
        userId,
        `image-${Date.now()}.jpg`,
        "image/jpeg"
      );

      return new Response(JSON.stringify(s3Response), { status: 200 });
    } catch (error) {
      console.error(
        "Error in save-content route -> Upload to S3 and save to database:",
        error
      );
      return new Response(
        JSON.stringify({ error: "Internal Server Error", message: error }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } else {
    try {
      const res = await uploadVideoToS3(imageUrl, userId);

      return new Response(JSON.stringify(res), { status: 200 });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Internal Server Error", message: error }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
}
