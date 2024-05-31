import { NextResponse } from "next/server";
import questionsLiveStreamFile from "../mock-data.json";

export async function GET() {
  // Ensure that questionsFile and its property questions_data have been loaded properly
  if (!questionsLiveStreamFile) {
    return new NextResponse(
      JSON.stringify({ error: "Questions data not found" }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  const artists = questionsLiveStreamFile;
  // Returning a 200 response with the keys
  return new NextResponse(JSON.stringify(artists), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
