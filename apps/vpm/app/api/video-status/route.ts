import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const validateVideoId = (videoId: string): boolean => {
  return typeof videoId === "string" && videoId.length === 64;
};

export async function GET(request: NextRequest) {
  const videoId = request.nextUrl.searchParams.get("videoId");
  console.log(`Fetching video status for ID: ${videoId}`);

  if (typeof videoId !== "string" || !validateVideoId(videoId)) {
    return new NextResponse(JSON.stringify({ error: "Invalid videoId" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await axios.get(
      `https://api.stability.ai/v2alpha/generation/image-to-video/result/${videoId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          accept: "application/json",
        },
      }
    );
    console.log(`Stability API response:`, response.status);

    if (response.status === 200) {
      if (response.headers["content-type"].includes("application/json")) {
        const videoData = response.data.video;
        return new NextResponse(
          JSON.stringify({ video: videoData, status: "complete" }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        const videoBytes = response.data;
        return new NextResponse(videoBytes, {
          status: 200,
          headers: { "Content-Type": "video/mp4" },
        });
      }
    } else if (response.status === 202) {
      return new NextResponse(
        JSON.stringify({ elapsed_time: 10, status: "in-progress" }),
        {
          status: 202,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      throw new Error(`Error checking video status: Status ${response.status}`);
    }
  } catch (error: any) {
    console.error(`Error fetching video status for ${videoId}:`, error.message);
    return new NextResponse(
      JSON.stringify({
        error: "Error checking video status",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "video/mp4" },
      }
    );
  }
}
