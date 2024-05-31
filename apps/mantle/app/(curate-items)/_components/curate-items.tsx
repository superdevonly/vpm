import { StepHEader } from "@/components/step-header";
import { CurateItem } from "./curate-item";
import { stepTransition } from "@/utils/transitions";
import { motion } from "framer-motion";

const CurateItems = () => {
  return (
    <motion.div className="flex flex-col gap-10 px-6" animate={stepTransition}>
      <StepHEader description="Choose items that you'd like to regenerate" />
      <div className="flex flex-row gap-3">
        {[1, 2, 3].map(() => (
          <CurateItem imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP1QyMhYL3C37VR5TGaVua832_ureLkwjg4QS7M3XboQ&s" />
        ))}
      </div>
    </motion.div>
  );
};

export { CurateItems };
