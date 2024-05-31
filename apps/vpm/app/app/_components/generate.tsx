"use client";
import CreateImage from "@/components/create-image";
import ModeSelection from "@/components/home/mode-selection";
import QuestionComponent from "@/components/home/question-component";
import QuestionSelection from "@/components/home/question-selection";
import { GenerateProps } from "@/utils/types";
import { fetchData } from "@repo/utils/fetch-data";
import { useCallback } from "react";
import SongSelection from "@/components/home/song-selection";
import { useAppContext } from "@/context/AppContext";

const Generate: React.FC<GenerateProps> = ({ routeId }) => {
  const {
    mode,
    setMode,
    song,
    setSong,
    songs,
    numQuestions,
    setNumQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    questions,
    setQuestions,
    options,
    setOptions,
    responses,
    setResponses,
    finalPrompt,
    setFinalPrompt,
  } = useAppContext();

  const handleError = (message: string, error: any) => {
    console.error(message, error);
  };
  const selectMode = useCallback(
    async (selectedMode: string) => {
      try {
        const data = await fetchData("/api/fetch-num-questions", "POST", {
          mode: selectedMode,
        });
        setOptions(data.options);
        setMode(selectedMode);
        setNumQuestions(0);
        setQuestions([]);
        setResponses({});
        setFinalPrompt("");
      } catch (error) {
        handleError("Error fetching options for mode:", error);
      }
    },
    [options]
  );

  const selectNumQuestions = useCallback(
    async (selectedNumQuestions: number) => {
      try {
        const data = await fetchData("/api/fetch-questions", "POST", {
          mode,
          numQuestions: selectedNumQuestions,
        });
        setQuestions([data]);
        setNumQuestions(selectedNumQuestions);
        setCurrentQuestionIndex(0);
      } catch (error) {
        handleError("Error fetching questions for mode:", error);
      }
    },
    [mode]
  );

  const handleOptionSelect = useCallback(
    async (option: string) => {
      const newResponses = {
        ...responses,
        [questions[currentQuestionIndex].question]: option,
      };
      setResponses(newResponses);
      if (currentQuestionIndex < numQuestions - 1) {
        try {
          const nextQuestionData = await fetchData(
            "/api/next-question",
            "POST",
            {
              responses: newResponses,
              mode,
              numQuestions,
            }
          );
          if (nextQuestionData.question) {
            setQuestions((prevQuestions) => [
              ...prevQuestions,
              nextQuestionData,
            ]);
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          } else {
            handleError(
              "Expected to receive the next question, but did not:",
              nextQuestionData
            );
          }
        } catch (error) {
          handleError("Error fetching next question:", error);
        }
      } else {
        try {
          const finalPromptData = await fetchData(
            "/api/next-question",
            "POST",
            {
              responses: newResponses,
              mode,
              numQuestions,
            }
          );
          if (finalPromptData.finalPrompt) {
            setFinalPrompt(finalPromptData.finalPrompt);
          } else {
            handleError(
              "Expected to receive the final prompt, but did not:",
              finalPromptData
            );
          }
        } catch (error) {
          handleError("Error fetching final prompt:", error);
        }
      }
    },
    [currentQuestionIndex, mode, numQuestions, questions, responses]
  );
  return (
    <div className="items-center my-28">
      <div className="content">
        {!mode ? (
          <ModeSelection selectMode={selectMode} routeId={routeId} />
        ) : !song && routeId === "live" ? (
          <SongSelection songs={songs[mode]} setSong={setSong} />
        ) : !numQuestions && routeId === "app" ? (
          <QuestionSelection
            options={options}
            selectNumQuestions={selectNumQuestions}
            routeId={routeId}
          />
        ) : finalPrompt ? (
          <CreateImage routeId={routeId} />
        ) : (
          <QuestionComponent
            currentQuestionIndex={currentQuestionIndex}
            handleOptionSelect={handleOptionSelect}
            routeId={routeId}
          />
        )}
      </div>
    </div>
  );
};

export { Generate };
