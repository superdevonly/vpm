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
export interface OptionCategories {
  [question: string]: string[];
}

export interface QuestionOption {
  [key: string]: string[];
}

export interface ModeSpecificQuestions {
  [key: number]: string[];
}
export type NewResponsesType = {
  [question: string]: string;
};

export type Ratio = "horizontal" | "vertical" | "square";

export type CreateImageProps = {
  routeId: string;
};

export type ImageSelectorProps = {
  onClick: Dispatch<SetStateAction<ImageStyle | null>>;
  selectedStyle: ImageStyle;
  routeId: string;
};

export type ImageRatioSelectorProps = {
  onClick: Dispatch<SetStateAction<ImageRatio | null>>;
  selectedRatio: ImageRatio;
};

export type ModeSelectionProps = {
  selectMode: (mode: string) => Promise<void>;
  routeId: string;
};

export type QuestionComponentProps = {
  currentQuestionIndex: number;
  handleOptionSelect: (option: string) => Promise<void>;
  routeId: string;
};
export interface QuestionSelectionProps {
  options: string[];
  selectNumQuestions: (numQuestions: number) => Promise<void>;
  routeId: string;
}

export interface SongSelectionProps {
  songs: string[];
  setSong: Dispatch<SetStateAction<string>>;
}

export type AlertProps = {
  open: boolean;
  openChange: Dispatch<SetStateAction<boolean>>;
  text: string;
};

export type VideoResultProps = {
  videoId: string;
  videoUrl: string;
  ratio: ImageRatio;
  routeId: string;
  artistName: string;
};

export type LivePeerPlayerProps = {
  url: string;
  title: string;
  autoPlay?: boolean;
  showPipButton?: boolean;
};

export interface LivepeerAsset {
  id: string;
  playbackId: string;
}

export type falResponse = {
  images: [{ url: string; content_type: string }];
  prompt: string;
};
export interface FalVideoResponse {
  video: { url: string };
}
export interface createVideoType {
  isSuccess: boolean;
  videoUrl: string;
  message: string;
}

export type livestreamItemType = {
  livestreamID: Number;
  artistName: string;
  assetIdOrUrl: string;
  assetType: string;
};

export interface GenerateProps {
  routeId: string;
}

export type SongsType = {
  Artist1: string[];
  Artist2: string[];
  Artist3: string[];
};

export type Song = {
  title: string;
  id: string;
  questions: string[];
  prompt: string;
};

export type ArtistData = {
  [key: string]: {
    songs: Song[];
  };
};

export type ExtractedSongs = {
  [key: string]: string[];
};

export type ExtractedQuestions = {
  [key: string]: {
    [key: string]: string[];
  };
};

export type ExtractedPrompts = {
  [artistName: string]: [
    {
      [songId: string]: string;
    },
  ];
};

export type SongsType = {
  [key: string]: Set<string>;
};
export type attributeDataType = {
  userId: string;
  images: { [artistName: string]: SongsType };
  livestreamId: string;
};
export type countType = {
  songId: string;
  count: number;
};

export type userDataType = {
  userId: string;
  userName: string;
};

export interface ChatAppProps {
  userId: string;
  userName: string;
}
