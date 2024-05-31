/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import React from "react";
import Button from "@repo/ui/button";

type ModeSelectionProps = {
  selectMode: (mode: string) => Promise<void>;
};

const ModeSelection: React.FC<ModeSelectionProps> = ({ selectMode }) => (
  <div className="flex flex-col flex-wrap items-center w-full">
    <h1 className="text-lg text-center">Select a Mode</h1>
    <div className="flex flex-wrap gap-3 mt-4 md:flex-nowrap">
      <Button
        size="lg"
        className="w-full md:w-auto"
        onClick={() => selectMode("Music")}
      >
        Music
      </Button>
      <Button
        size="lg"
        className="w-full mode-button md:w-auto"
        onClick={() => selectMode("Design")}
      >
        Design
      </Button>
      <Button
        size="lg"
        className="w-full mode-button md:w-auto"
        onClick={() => selectMode("Film")}
      >
        Film
      </Button>
    </div>
  </div>
);

export default ModeSelection;
