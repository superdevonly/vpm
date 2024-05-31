type QuestionSet = {
  "3"?: string[];
  "7"?: string[];
  "12"?: string[];
};

export type QuestionsData = {
  [category: string]: QuestionSet;
};

export interface QuestionsOptions {
  Music: OptionCategories;
  Design: OptionCategories;
  Film: OptionCategories;
}

// Generic type to represent the mapping of questions to their respective answer options
interface OptionCategories {
  [question: string]: string[];
}

export type Ratio = "horizontal" | "vertical" | "square";