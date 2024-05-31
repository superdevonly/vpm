"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Button from "@repo/ui/button";
import Link from "next/link";

const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.9], [0.5, 0.8]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 3.2], [-900, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="relative mb-28 flex h-[100vh] w-full flex-col self-auto overflow-hidden py-28 antialiased [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      {/* <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div> */}

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="absolute left-0 right-0 top-1/2"
      >
        <motion.div className="flex flex-row-reverse mb-20 space-x-20 space-x-reverse">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-20 space-x-reverse">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="z-10 flex flex-col items-center max-w-2xl px-4 py-20 mx-auto rounded-lg md:py-40 bg-radial-gradient">
      <h1 className="text-5xl font-bold text-center dark:text-white md:text-7xl">
        Custom Visuals for Creative
      </h1>
      <p className="max-w-2xl mt-8 mb-8 text-base text-center dark:text-neutral-200 md:text-xl">
        Make high quality imagery quickly for performances, social, events,
        story and mood boards.
      </p>

      <Button size="lg" asChild>
        <Link href="#features">Discover More</Link>
      </Button>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title?: string;
    link?: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product relative h-96 w-[30rem] flex-shrink-0 rounded-lg overflow-hidden"
    >
      {/* <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl"
      > */}
      <Image
        src={product.thumbnail}
        height="600"
        width="600"
        className="absolute inset-0 object-cover object-left-top w-full h-full"
        alt="image"
      />
      {/* </Link> */}
      <div className="absolute inset-0 w-full h-full bg-black opacity-0 pointer-events-none "></div>
      {/* <h2 className="absolute text-white opacity-0 bottom-4 left-4 group-hover/product:opacity-100">
        {product.title}
      </h2> */}
    </motion.div>
  );
};

export { HeroParallax };
