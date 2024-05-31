import { NextRequest, NextResponse } from "next/server";
import { StreamChat } from "stream-chat";

const apiKey = process.env.NEXT_PUBLIC_STREAMCHAT_API_KEY! as string;
const apiSecret = process.env.NEXT_PUBLIC_STREAMCHAT_API_SECRET! as string;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId } = body;

  const serverClient = StreamChat.getInstance(apiKey, apiSecret);

  const swedishChannel = serverClient.channel(
    "messaging",
    process.env.STREAMCHAT_SWEDISH_CAHNNEL_ID
  );
  const englsihChannel = serverClient.channel(
    "messaging",
    process.env.STREAMCHAT_ENGLISH_CAHNNEL_ID
  );
  try {
    // Add the user to the channel
    await swedishChannel.addMembers([
      { user_id: userId, channel_role: "channel_member" },
    ]);
    await englsihChannel.addMembers([
      { user_id: userId, channel_role: "channel_member" },
    ]);
    console.log("User added to 2 channels");
    return new NextResponse(JSON.stringify({ status: "exists" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error checking or creating user:", error);
    return new NextResponse(JSON.stringify({ status: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
