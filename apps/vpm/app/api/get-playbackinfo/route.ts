import { NextRequest, NextResponse } from "next/server";
import { getPlaybackInfo } from "@/lib/livepeer";
import { getSrc } from "@livepeer/react-latest/external";

export async function GET(req: NextRequest) {
  const playbackId: string = req.nextUrl.searchParams.get("playbackId")!;
  const inputSource = await getPlaybackInfo(playbackId);
  const src = getSrc(inputSource);
  return new NextResponse(JSON.stringify(src), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
