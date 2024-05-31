import { s3Upload } from "@/lib/aws";
import { addUserLivestreamImages } from "@/lib/dynamodb";
import { NextRequest } from "next/server";
import fetch from "node-fetch";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId, imageUrl, isVideo, routeId, artistName, songId } = body;
  let fileBuffer;
  let s3Response;

  if (!isVideo) {
    try {
      if (routeId === "app") {
        const response = await fetch(imageUrl);
        if (response.ok) {
          fileBuffer = await response.buffer();
        }
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
      if (routeId === "app") {
        s3Response = await s3Upload(
          fileBuffer!,
          userId,
          `image-${Date.now()}.jpg`,
          "image/jpeg"
        );
        return new Response(JSON.stringify(s3Response), { status: 200 });
      } else {
        const imageResponse = await addUserLivestreamImages(
          userId,
          "livestreamId",
          artistName,
          songId,
          imageUrl
        );
        if (imageResponse) {
          return new Response(JSON.stringify(imageResponse), { status: 200 });
        }
      }
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
  }
}
