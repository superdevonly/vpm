"use client";
import { LivePeerPlayerProps } from "@/utils/types";
import { Player } from "@livepeer/react-3.1.9";

export const LivePeerPlayer = ({
  url,
  title,
  autoPlay = false,
  showPipButton = false,
}: LivePeerPlayerProps) => {
  const id = title.split("_")[1];
  const identifier = id?.slice(0, -4);
  const ratio =
    identifier === "horizontal"
      ? "16to9"
      : identifier === "vertical"
        ? "9to16"
        : identifier === "square"
          ? "1to1"
          : "16to9";

  return (
    <Player
      src={url}
      autoPlay={autoPlay}
      showPipButton={showPipButton}
      aspectRatio={ratio}
    />
  );
};
