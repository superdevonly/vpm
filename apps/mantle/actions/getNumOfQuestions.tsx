import questionsFile from "../app/api/questions.json";

export const getNumberOfQuestions = (mode: any) => {
  const questions: any = questionsFile.questions_data;
  return Object.keys(questions[mode] ?? {});
};
