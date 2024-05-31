/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import React, { useEffect, useState } from "react";
import Button from "@repo/ui/button";
import { SongSelectionProps, countType } from "@/utils/types";
import { useAppContext } from "@/context/AppContext";
import { usePrivy } from "@privy-io/react-auth";
import { Loader } from "@repo/ui/loader";

const SongSelection: React.FC<SongSelectionProps> = ({ songs, setSong }) => {
  const { mode } = useAppContext();
  const [data, setData] = useState<countType[]>([]);
  const { user } = usePrivy();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchImageCounts = async () => {
      try {
        const res = await fetch(
          `/api/get-image-counts?userId=${user?.id}&artistName=${mode}`
        );
        const json = await res.json();
        setData(json.counts);
      } catch (error) {
        console.error("Error fetching playback info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImageCounts();
  }, [mode, user]);
  return (
    <div className="flex flex-col flex-wrap items-center w-full">
      <h1 className="text-lg text-center">Select a Song</h1>
      <div className="flex flex-wrap gap-3 mt-4 md:flex-nowrap">
        {loading ? (
          <Loader />
        ) : (
          songs?.map((option, index) => {
            const maxNumber = Number(
              process.env.NEXT_PUBLIC_LIVESTREAM_GENERATIONS_PER_SONG
            );
            const selectedSong = data.find((item) => item.songId === option);
            const disabled = selectedSong
              ? selectedSong.count >= maxNumber
              : false;
            return (
              <Button
                key={index}
                size="lg"
                className="w-full md:w-auto"
                disabled={!data ? false : disabled}
                onClick={() => setSong(option)}
              >
                {option.replaceAll("_", " ")}
              </Button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SongSelection;
