import React from "react";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "./bento-grid";

const Features = () => {
  return (
    <BentoGrid className="mx-auto max-w-[1200px] px-8 md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
};
const Skeleton = () => (
  <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex h-full min-h-[6rem] w-full flex-1 rounded-xl border border-transparent bg-neutral-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:border-white/[0.2] dark:bg-black"></div>
);
const items = [
  {
    title: "Prompt Accelerator",
    description:
      "Maximize efficiency with our easy-to-use prompt sequencing, which delivers consistent results.",
    header: <Skeleton />,
    className: "md:col-span-3",
    icon: (
      <Image
        alt="Prompts Illustration"
        src="/landing/features/prompt.png"
        width={700}
        height={130}
        className="object-cover rounded-md"
      />
    ),
  },
  {
    title: "Video Generation",
    description:
      "Enhance your digital storytelling by transforming static images into captivating videos with just a few clicks.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: (
      <Image
        alt="Video Illustration"
        src="/landing/features/video.png"
        width={700}
        height={130}
        className="object-cover rounded-md"
      />
    ),
  },
  {
    title: "Diverse Styles for Every Vision",
    description:
      "Choose from three distinct visual styles to match your project's aesthetic, tone and purpose.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: (
      <Image
        alt="Video Illustration"
        src="/landing/features/style.png"
        width={700}
        height={130}
        className="object-cover rounded-md"
      />
    ),
  },
  {
    title: "Flexible Formats for Any Platform",
    description:
      "Adapt your visuals to the perfect format with our versatile image ratio options.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: (
      <Image
        alt="Ratio Illustration"
        src="/landing/features/ratio.png"
        width={700}
        height={130}
        className="object-cover rounded-md"
      />
    ),
  },

  {
    title: "Personalized User Gallery",
    description:
      "Manage your projects with ease via your personalized gallery. All your assets right at your fingertips.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: (
      <Image
        alt="Gallery Illustration"
        src="/landing/features/gallery.png"
        width={700}
        height={130}
        className="object-cover rounded-md"
      />
    ),
  },
];

export { Features };
