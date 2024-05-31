import { getItemAttributes } from "@/lib/dynamodb";
import { attributeDataType, countType } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId: string = req.nextUrl.searchParams.get("userId")!;
  const artistName: string = req.nextUrl.searchParams.get("artistName")!;
  let counts: countType[] = [];
  let message;
  try {
    const data = (await getItemAttributes(userId)) as attributeDataType;
    if (data) {
      const songs = data.images[artistName] as any;

      for (let key in songs) {
        counts.push({
          songId: key,
          count: Array.from(songs[key]).length,
        });
      }
    } else {
      counts = [];
      message = "no images yet";
    }
    return new NextResponse(JSON.stringify({ counts: counts, msg: message }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: `Server error:${error}` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
