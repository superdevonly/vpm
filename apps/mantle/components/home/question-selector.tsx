import Button from "@repo/ui/button";
import { useStepper } from "@repo/ui/stepper";
import React, { useState } from "react";
import { StepHEader } from "../step-header";
import { motion } from "framer-motion";
import { stepTransition } from "@/utils/transitions";

type QuestionComponentProps = {
  questions: any;
};

const QuestionSelector: React.FC<QuestionComponentProps> = ({ questions }) => {
  const { nextStep } = useStepper();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const finalQuestion =
    currentQuestionIndex === Object.keys(questions).length - 1;

  const handleOptionSelect = (option: string) => {
    if (finalQuestion) {
      nextStep();
      return;
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setOptions([...options, option]);
      console.log(options);
    }
  };

  return (
    <motion.div
      className="mx-auto flex w-full max-w-[500px] flex-col flex-wrap"
      animate={stepTransition}
    >
      <StepHEader description={Object.keys(questions)[currentQuestionIndex]} />

      <div className="flex flex-wrap w-full gap-3 mt-4">
        {questions[Object.keys(questions)[currentQuestionIndex]!].map(
          (option: string, index: number) => (
            <Button
              key={index}
              size="lg"
              className="w-full "
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </Button>
          )
        )}
      </div>
    </motion.div>
  );
};

export default QuestionSelector;
