"use client";
import { StepHEader } from "@/components/step-header";
import { stepTransition } from "@/utils/transitions";
import { Input } from "@repo/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@repo/ui/select";
import { motion } from "framer-motion";

const Settings = () => {
  return (
    <motion.div className="flex flex-col gap-10 px-28" animate={stepTransition}>
      <StepHEader description="Change your collelction settings" />

      <div className="flex flex-col gap-3 max-w[500px]">
        <Input placeholder="Collection size" max={10000} />

        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Background" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Solid</SelectItem>
            <SelectItem value="dark">Pattern</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Ratio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Square</SelectItem>
            <SelectItem value="light">Horizontal</SelectItem>
            <SelectItem value="dark">Vertical</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
};

export { Settings };
