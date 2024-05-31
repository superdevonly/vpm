/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import React from "react";
import Button from "@repo/ui/button";
import { QuestionSelectionProps } from "@/utils/types";

const QuestionSelection: React.FC<QuestionSelectionProps> = ({
  options,
  selectNumQuestions,
  routeId,
}) => (
  <div className="flex flex-col flex-wrap items-center w-full">
    <h1 className="text-lg text-center">Select Number of Questions</h1>
    <div className="flex flex-wrap gap-3 mt-4 md:flex-nowrap">
      {options &&
        options.map((option, index) => (
          <Button
            key={index}
            size="lg"
            className="w-full md:w-auto"
            onClick={() => selectNumQuestions(parseInt(option))}
          >
            {`${option} Questions`}
          </Button>
        ))}
    </div>
  </div>
);

export default QuestionSelection;
