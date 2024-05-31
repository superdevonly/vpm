import { useState } from "react";
import questionsFile from "../../api/questions.json";
import { ModeSelector } from "./mode-selector";
import QuestionSelector from "@/components/home/question-selector";

const getQuestionOptions = (mode: any) => {
  const options: any = questionsFile.questions_options;
  return options[mode];
};

const Questions = () => {
  const options = getQuestionOptions("character");
  const [selectedMode, setSelectedMode] = useState();

  const handleModeChange = (mode: any) => {
    setSelectedMode(mode);
  };

  if (!selectedMode)
    return <ModeSelector handleModeChange={handleModeChange} />;

  return <QuestionSelector questions={options} />;
};

export default Questions;
