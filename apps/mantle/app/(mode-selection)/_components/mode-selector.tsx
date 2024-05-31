import { StepHEader } from "@/components/step-header";
import { cn } from "@repo/ui/utils";
import Link from "next/link";

const ModeSelector = () => {
  return (
    <div className="flex flex-col w-full gap-10 mx-auto">
      <StepHEader description="Choose your preffered collection style" />

      <div className="flex justify-center w-full gap-3">
        <Link href="/nft-collection">
          <div
            className={cn(
              "flex h-[300px] w-[300px] items-center justify-center rounded-md border bg-zinc-900 hover:cursor-pointer hover:border-primary"
            )}
          >
            NFT Collection
          </div>
        </Link>
        <Link href="/telegram-bot">
          <div
            className={cn(
              "flex h-[300px] w-[300px] items-center justify-center rounded-md border bg-zinc-900 hover:cursor-pointer hover:border-primary"
            )}
          >
            Telegram Bot
          </div>
        </Link>
      </div>
    </div>
  );
};

export { ModeSelector };
