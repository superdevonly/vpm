import { StepHEader } from "@/components/step-header";
import { CompositionStyleCard } from "./composition-style-card";
import { stepTransition } from "@/utils/transitions";
import { motion } from "framer-motion";

const CompositionStyles = () => {
  return (
    <motion.div className="flex flex-col gap-10 px-28" animate={stepTransition}>
      <StepHEader description="This is how your collection will look like" />
      <div className="flex flex-row gap-3">
        {[1, 2, 3, 4].map(() => (
          <CompositionStyleCard imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP1QyMhYL3C37VR5TGaVua832_ureLkwjg4QS7M3XboQ&s" />
        ))}
      </div>
    </motion.div>
  );
};

export { CompositionStyles };
