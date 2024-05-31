import { NextRequest, NextResponse } from "next/server";
import { StreamChat } from "stream-chat";

const apiKey = process.env.NEXT_PUBLIC_STREAMCHAT_API_KEY! as string;
const apiSecret = process.env.NEXT_PUBLIC_STREAMCHAT_API_SECRET! as string;
export async function GET(req: NextRequest) {
  const userId: string = req.nextUrl.searchParams.get("userId")!;
  const serverClient = StreamChat.getInstance(apiKey, apiSecret);
  // Create User Token
  const token = serverClient.createToken(userId);

  return new NextResponse(JSON.stringify({ userToken: token }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
