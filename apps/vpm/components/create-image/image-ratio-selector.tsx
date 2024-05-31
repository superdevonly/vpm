import { cn } from "@repo/ui/utils";
import { ImageRatio } from "@repo/utils/types";
import { ImageRatioSelectorProps } from "@/utils/types";

const aspects = [
  {
    name: "Square",
    desc: "Perfect for Instagram post",
    class: "h-[80px] w-[80px]",
    type: "square",
  },
  {
    name: "Horizontal",
    desc: "Projectors, wallpapers",

    class: "h-[80px] w-[130px]",
    type: "horizontal",
  },
  {
    name: "Vertical",
    desc: "TikTok, IG Stories",
    class: "h-[80px] w-[50px]",
    type: "vertical",
  },
];

const ImageRatioSelector = ({
  onClick,
  selectedRatio,
}: ImageRatioSelectorProps) => {
  return (
    <div className="space-y-1">
      <h1 className="mb-3 text-center text-lg">Image Aspect Ratio</h1>

      <div className="flex flex-col justify-between gap-10 md:flex-row">
        {aspects?.map((aspect) => (
          <div key={aspect.type} className="w-full">
            <div
              onClick={() => {
                onClick(aspect.type as ImageRatio);
              }}
              className={cn(
                selectedRatio === aspect.type
                  ? "border-2 border-white hover:border-white"
                  : "border-2 border-border hover:border-primary",
                "items-center p-1  rounded-md bg-popover hover:cursor-pointer"
              )}
            >
              <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                <div className="flex items-center justify-center space-y-2 rounded-md p-2 shadow-sm">
                  <div className={`${aspect.class} rounded-lg bg-primary`} />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="w-full p-2 font-semibold">{aspect.name}</span>

              <span className="w-full p-2 pt-0 font-normal text-secondary-foreground">
                {aspect.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ImageRatioSelector };
