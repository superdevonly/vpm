import questionsFile from "@/app/api/questions.json";
import {
  ModeSpecificQuestions,
  NewResponsesType,
  QuestionOption,
} from "@/utils/types";

export const getNextQuestion = async (
  newResponses: NewResponsesType,
  mode: string,
  num_asked: number,
  numQuestions: number
): Promise<{ question: string | null; options: string[] | null }> => {
  const data: any = questionsFile;
  const mode_specific_questions: ModeSpecificQuestions =
    data.questions_data[mode] || {};
  const questions: string[] = mode_specific_questions[numQuestions] || [];
  const mode_specific_options: QuestionOption =
    data.questions_options[mode] || {};

  for (const question of questions) {
    if (!Object.prototype.hasOwnProperty.call(newResponses, question)) {
      const options: string[] = mode_specific_options[question] || [];
      return { question, options };
    }
  }

  return { question: null, options: null };
};
