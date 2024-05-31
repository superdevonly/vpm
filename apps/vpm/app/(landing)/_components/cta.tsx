"use client";
import { motion } from "framer-motion";
import { AnimatedDottedBackground } from "./animated-dotted-background";
import Button from "@repo/ui/button";
import Link from "next/link";

const Cta = () => {
  return (
    <AnimatedDottedBackground>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        className="mx-auto max-w-[800px] px-8 text-center  leading-relaxed text-foreground md:text-4xl lg:text-5xl lg:leading-snug"
      >
        <div className="text-4xl font-bold">
          Join the community of visionaries using VPM to enhance their creative
          projects
        </div>
        <div className="mt-8 mb-8 text-xl">
          Sign up today and start transforming your ideas into stunning visual
          realities
        </div>

        <Button size="lg" asChild>
          <Link
            href="https://eu.jotform.com/form/240594613118051"
            target="_blank"
          >
            Get Early Access
          </Link>
        </Button>

        {/* <Highlight className="text-black dark:text-white">
          copy, of a copy, of a copy.
        </Highlight> */}
      </motion.h1>
    </AnimatedDottedBackground>
  );
};

export { Cta };
