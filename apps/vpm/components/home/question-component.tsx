/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import React, { useEffect, useState } from "react";
import Button from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { QuestionComponentProps } from "@/utils/types";
import { useAppContext } from "@/context/AppContext";
import { generateFinalPrompt } from "@/lib/generate-prompt";

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  currentQuestionIndex,
  handleOptionSelect,
  routeId,
}) => {
  const [customOption, setOption] = useState<string>("");
  const [specificQuesions, setSpecificQuestions] = useState<string[]>([]);
  const {
    mode,
    song,
    options,
    questions,
    allquestions,
    prompts,
    setOptions,
    setFinalPrompt,
  } = useAppContext();

  useEffect(() => {
    const artistQuestions = allquestions[mode];
    if (artistQuestions) {
      const songQuestions = artistQuestions[song];
      if (songQuestions) {
        setSpecificQuestions(songQuestions);
      }
    }
  }, [mode, song]);

  useEffect(() => {
    (async () => {
      if (
        specificQuesions.length > 0 &&
        specificQuesions.length === options.length
      ) {
        if (prompts[mode]) {
          const promptObject = prompts[mode]?.find((item) => item[song]);
          if (promptObject) {
            const finaPprompt = await generateFinalPrompt(
              promptObject[song]!,
              options
            );
            setFinalPrompt(finaPprompt);
          }
        }
      }
    })();
  }, [options, specificQuesions, prompts]);

  const handleNextOption = async () => {
    if (routeId === "live") {
      setOptions((prev) => [...prev, customOption]);
    } else {
      handleOptionSelect(customOption);
    }
    setOption("");
  };
  return (
    <div className="mx-auto flex w-full max-w-[500px] flex-col flex-wrap">
      <h1 className="text-lg text-center">
        {routeId === "app"
          ? questions[currentQuestionIndex].question
          : specificQuesions[options.length]}
      </h1>
      <div className="flex flex-wrap w-full gap-3 mt-4">
        {routeId == "app" &&
          questions[currentQuestionIndex].options.map(
            (option: string, index: number) => (
              <Button
                key={index}
                size="lg"
                className="w-full lg:w-auto"
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </Button>
            )
          )}
      </div>

      <div className="mt-4 flex w-full items-center gap-2 max-[500px]:flex-col">
        <Input
          className="w-full"
          type="text"
          value={customOption}
          placeholder={`${routeId === "app" ? "Or add your custom answer..." : "Type your answer.."}`}
          onChange={(e) => setOption(e.target.value)}
        />
        <Button
          className="max-[500px]:w-full"
          disabled={customOption === ""}
          onClick={handleNextOption}
        >
          {routeId === "app" ? "Use Custom Answer" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default QuestionComponent;
