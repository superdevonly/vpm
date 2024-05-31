import { Card } from "@repo/ui/card";
import { cn } from "@repo/ui/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <Card
      className={cn(
        "row-span-1 group/bento transition duration-200 p-4  justify-between flex flex-col space-y-4 bg-gray-950",
        className
      )}
    >
      {/* <CardContent> */}
      {/* {header} */}
      <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 rounded-xl border border-transparent bg-neutral-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:border-white/[0.2] dark:bg-[#09090B] justify-center">
        {icon}
      </div>
      <div className="p-6 transition duration-200 group-hover/bento:translate-x-2">
        {/* {icon} */}
        <div className="mt-2 mb-2 font-sans text-lg font-bold text-neutral-600 dark:text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-base font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
      {/* </CardContent> */}
    </Card>
  );
};
