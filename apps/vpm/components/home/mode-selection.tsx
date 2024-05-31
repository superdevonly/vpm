import React, { useEffect, useState } from "react";
import Button from "@repo/ui/button";
import {
  ArtistData,
  ExtractedPrompts,
  ExtractedQuestions,
  ExtractedSongs,
  ModeSelectionProps,
} from "@/utils/types";
import { Loader } from "@repo/ui/loader";
import { useAppContext } from "@/context/AppContext";

const ModeSelection: React.FC<ModeSelectionProps> = ({
  selectMode,
  routeId,
}) => {
  const [data, setData] = useState<ArtistData>();
  const [modes, setModes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { setMode, setSongs, setAllQuestions, setPrompts } = useAppContext();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch("/api/get-artists");
        if (response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("An error occurred while fetching the data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (routeId === "live") {
      fetchArtists();
    } else if (routeId === "app") {
      setModes(["Music", "Design", "Film"]);
      setLoading(false);
    }
  }, [routeId]);

  useEffect(() => {
    if (data) {
      setModes(Object.keys(data));
      setSongs(extractSongs(data));
      setAllQuestions(extractAllQuestions(data));
      setPrompts(extractAllPrompts(data));
    }
  }, [data]);

  const extractAllPrompts = (data: ArtistData): ExtractedPrompts => {
    const prompts: ExtractedPrompts = {};
    if (!data) {
      return prompts;
    }

    for (const artist in data) {
      const artistData = data[artist];
      if (artistData && artistData.songs) {
        // Initialize an array to store song prompts
        const songPrompts: { [songId: string]: string } = {};
        // Loop through each song and add its prompt to the songPrompts object
        for (const song of artistData.songs) {
          songPrompts[song.id] = song.prompt;
        }
        // Save the song prompts under the artist key in the prompts object
        prompts[artist] = [songPrompts];
      }
    }

    return prompts;
  };
  const extractSongs = (artists: ArtistData) => {
    const songs: ExtractedSongs = {};
    for (const artist in artists) {
      songs[artist] = artists[artist]?.songs.map((song) => song.id) as any;
    }
    return songs;
  };

  const extractAllQuestions = (data: ArtistData): ExtractedQuestions => {
    const questions: ExtractedQuestions = {};
    if (!data) {
      return questions;
    }

    for (const artist in data) {
      const artistData = data[artist];
      if (artistData && artistData.songs) {
        questions[artist] = {};
        for (const song of artistData.songs) {
          questions[artist] = {
            ...questions[artist],
            [song.id]: song.questions,
          };
        }
      }
    }

    return questions;
  };
  return (
    <div className="flex flex-col flex-wrap items-center w-full">
      <h1 className="text-lg text-center">
        Select {routeId === "app" ? "a Mode" : "an Artist"}
      </h1>
      <div className="flex flex-wrap gap-3 mt-4 md:flex-nowrap">
        {loading ? (
          <Loader />
        ) : (
          modes.map((mode) => (
            <Button
              key={mode}
              size="lg"
              className="w-full md:w-auto"
              onClick={() => {
                if (routeId === "app") {
                  selectMode(mode);
                } else {
                  setMode(mode);
                }
              }}
            >
              {mode.replace("_", " ")}
            </Button>
          ))
        )}
      </div>
    </div>
  );
};

export default ModeSelection;
