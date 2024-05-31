import { StepHEader } from "@/components/step-header";
import { cn } from "@repo/ui/utils";

const ModeSelector = ({ handleModeChange }: any) => {
  return (
    <div className="flex flex-col w-full gap-10 mx-auto">
      <StepHEader description="Choose your collection mode" />

      <div className="flex justify-center w-full gap-3">
        <div
          onClick={() => handleModeChange("abstract")}
          className={cn(
            "flex h-[300px] w-[300px] items-center justify-center rounded-md border bg-zinc-900 hover:cursor-pointer hover:border-primary"
          )}
        >
          Abstract
        </div>
        <div
          onClick={() => handleModeChange("character")}
          className={cn(
            "flex h-[300px] w-[300px] items-center justify-center rounded-md border bg-zinc-900 hover:cursor-pointer hover:border-primary"
          )}
        >
          Character
        </div>
      </div>
    </div>
  );
};

export { ModeSelector };
