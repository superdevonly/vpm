"use server";
import { NextRequest } from "next/server";
import crypto from "crypto";
import { incrementUserCredits } from "@/lib/dynamodb";
export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET ?? "";

  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
  const signature = Buffer.from(
    request.headers.get("X-Signature") || "",
    "utf8"
  );

  if (!crypto.timingSafeEqual(digest, signature)) {
    throw new Error("Invalid signature.");
  }

  const data = JSON.parse(rawBody);

  const eventName = data["meta"]["event_name"];
  const userID = data["meta"]["custom_data"]["user_id"];
  const isPatronOrder =
    data.data.attributes.first_order_item.product_id ==
    process.env.NEXT_PUBLIC_PATRON_PRODUCT_ID!;

  switch (eventName) {
    case "order_created":
      try {
        await incrementUserCredits(
          userID,
          "image",
          isPatronOrder
            ? process.env.NEXT_PUBLIC_USER_IMAGES_CREDITS_PATRON_TOPUP
            : process.env.NEXT_PUBLIC_USER_IMAGES_CREDITS_TOPUP
        );
        await incrementUserCredits(
          userID,
          "video",
          isPatronOrder
            ? process.env.NEXT_PUBLIC_USER_VIDEOS_CREDITS_PATRON_TOPUP
            : process.env.NEXT_PUBLIC_USER_VIDEOS_CREDITS_TOPUP
        );
        return new Response("Added credits to the user - " + userID);
      } catch (err: any) {
        return new Response(err.message);
      }

    case "subscription_created":
      break;
  }
  return new Response(`Event ${eventName} has been triggered!`);
}
