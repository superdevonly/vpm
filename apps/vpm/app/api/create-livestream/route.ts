import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { streamName, streamProfiles } = body;
  console.log("streamName", streamName);
  if (req.method === "POST") {
    try {
      const createStreamResponse = await axios.post(
        "https://livepeer.com/api/stream",
        {
          name: streamName,
          profiles: streamProfiles,
        },
        {
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${process.env.NEXT_PUBLIC_LIVEPEER_API_KEY}`, // API Key needs to be passed as a header
          },
        }
      );

      if (createStreamResponse && createStreamResponse.data) {
        return new NextResponse(
          JSON.stringify({ ...createStreamResponse.data }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        return new NextResponse(
          JSON.stringify({ error: "Something went wrong" }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    } catch (error: any) {
      if (error.response.status === 403) {
        return new NextResponse(JSON.stringify({ error: "Invalid API key" }), {
          status: 403,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new NextResponse(JSON.stringify({ error }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}
