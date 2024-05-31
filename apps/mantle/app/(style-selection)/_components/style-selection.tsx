import { StepHEader } from "@/components/step-header";
import React from "react";
import { StyleItem } from "./style-item";
import { motion } from "framer-motion";
import { stepTransition } from "@/utils/transitions";

const StyleSelection = () => {
  return (
    <motion.div className="flex flex-col gap-10 px-28" animate={stepTransition}>
      <StepHEader description="Choose your preferable colelction style" />
      <div className="flex flex-row gap-3">
        {[1, 2, 3].map(() => (
          <StyleItem imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP1QyMhYL3C37VR5TGaVua832_ureLkwjg4QS7M3XboQ&s" />
        ))}
      </div>
    </motion.div>
  );
};

export { StyleSelection };
