"use client";
import { Alert, AlertTitle, AlertDescription } from "@repo/ui/alert";
import Button from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";

const ZeroCreditsAlert = () => {
  const router = useRouter();
  const { user } = usePrivy();
  return (
    <Alert className="max-w-[500px]">
      <AlertTitle>You run out of credits!</AlertTitle>
      <AlertDescription>
        In order to generate more images and videos, you need to buy more
        credits.
        <div className="flex justify-end w-full mt-2">
          <Button
            onClick={() =>
              router.push(
                `${process.env.NEXT_PUBLIC_CREDIT_PAYMENT_GATEWAY_URL!}?checkout[custom][user_id]=${user?.id}`
              )
            }
          >
            Buy More Credits
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export { ZeroCreditsAlert };
