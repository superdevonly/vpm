import { cn } from "@repo/ui/utils";
import Image from "next/image";

const aspects = [
  {
    name: "Realistic",
    desc: "Perfect for Instagram post",
    img: "/stability-example.png",
    style: "realistic",
  },
  {
    name: "Animated",
    desc: "Perfect for Instagram post",
    img: "/dalle-example.png",
    style: "animated",
  },
  {
    name: "Creative (soon)",
    desc: "Perfect for Instagram post",
    img: "/cascade-example.png",
    style: "cascade",
    disabled: true,
  },
];

const ImageStyleSelector = ({ onClick, selectedStyle }: any) => {
  return (
    <div className="mb-10 space-y-1">
      <h1 className="mb-3 text-lg text-center">Image Style</h1>

      <div className="flex flex-col gap-10 sm:flex-row">
        {aspects.map((aspect, index) => (
          <div className="w-full" key={index}>
            <div className="[&:has([data-state=checked])>div]:border-primary">
              <div
                onClick={() => {
                  if (!aspect.disabled) {
                    onClick(aspect.style);
                  }
                }}
                className={cn(
                  selectedStyle === aspect.style
                    ? "border-2 border-white hover:border-white"
                    : "border-2 border-border hover:border-primary",
                  "items-center p-1 rounded-md bg-popover ",
                  !aspect.disabled && "hover:cursor-pointer"
                )}
              >
                <div className="p-2 space-y-2 rounded-sm bg-slate-950">
                  <div className="flex items-center justify-center rounded-sm">
                    <Image
                      width={200}
                      height={200}
                      className="w-[200px] rounded-sm bg-cover"
                      src={aspect.img}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <span className="w-full p-2 font-semibold">{aspect.name}</span>
                {/* <span className="w-full p-2 pt-0 font-normal text-secondary-foreground">
                  {aspect.desc}
                </span> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ImageStyleSelector };
