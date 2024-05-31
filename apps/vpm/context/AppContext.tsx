// src/context/AppContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { useUserCreditsStore } from "@/lib/store";
import {
  ExtractedPrompts,
  ExtractedQuestions,
  userDataType,
} from "@/utils/types";

interface AppContextType {
  chatUser: userDataType;
  setChatUser: Dispatch<SetStateAction<userDataType>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  song: string;
  setSong: Dispatch<SetStateAction<string>>;
  songs?: any;
  setSongs: Dispatch<SetStateAction<any>>;
  numQuestions: number;
  setNumQuestions: Dispatch<SetStateAction<number>>;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: Dispatch<SetStateAction<number>>;
  questions: any[];
  setQuestions: Dispatch<SetStateAction<any[]>>;
  allquestions: ExtractedQuestions;
  setAllQuestions: Dispatch<SetStateAction<ExtractedQuestions>>;
  options: string[];
  setOptions: Dispatch<SetStateAction<string[]>>;
  responses: { [key: string]: any };
  setResponses: Dispatch<SetStateAction<{ [key: string]: any }>>;
  prompts: ExtractedPrompts;
  setPrompts: Dispatch<SetStateAction<ExtractedPrompts>>;
  finalPrompt: string;
  setFinalPrompt: Dispatch<SetStateAction<string>>;
  userImageCredits: number | undefined;
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<string>>;
}
const initData: AppContextType = {
  chatUser: { userId: "", userName: "" },
  setChatUser: () => {},
  mode: "",
  setMode: () => {},
  song: "",
  setSong: () => {},
  songs: "",
  setSongs: () => {},
  numQuestions: 0,
  setNumQuestions: () => {},
  currentQuestionIndex: 0,
  setCurrentQuestionIndex: () => {},
  questions: [],
  setQuestions: () => {},
  allquestions: {},
  setAllQuestions: () => {},
  options: [],
  setOptions: () => {},
  responses: {},
  setResponses: () => {},
  finalPrompt: "",
  setFinalPrompt: () => {},
  prompts: {},
  setPrompts: () => {},
  userImageCredits: 0,
  imageUrl: "",
  setImageUrl: () => {},
};
const AppContext = createContext<AppContextType>(initData);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [chatUser, setChatUser] = useState<userDataType>({
    userId: "",
    userName: "",
  });
  const [mode, setMode] = useState<string>("");
  const [song, setSong] = useState<string>("");
  const [songs, setSongs] = useState<any>();
  const [numQuestions, setNumQuestions] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [allquestions, setAllQuestions] = useState<ExtractedQuestions>({});
  const [options, setOptions] = useState<string[]>([]);
  const [responses, setResponses] = useState<{ [key: string]: any }>({});
  const [prompts, setPrompts] = useState<ExtractedPrompts>({});
  const [finalPrompt, setFinalPrompt] = useState<string>("");
  const { userImageCredits } = useUserCreditsStore();
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <AppContext.Provider
      value={{
        chatUser,
        setChatUser,
        mode,
        setMode,
        song,
        setSong,
        songs,
        setSongs,
        numQuestions,
        setNumQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        questions,
        setQuestions,
        allquestions,
        setAllQuestions,
        options,
        setOptions,
        responses,
        setResponses,
        prompts,
        setPrompts,
        finalPrompt,
        setFinalPrompt,
        userImageCredits,
        imageUrl,
        setImageUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext<AppContextType>(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
