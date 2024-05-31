"use client";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Generate } from "../app/_components/generate";
import { PlayerWithControls, PlayerLoading } from "./components/player/Player";
import { useAppContext } from "@/context/AppContext";
import Button from "@repo/ui/button";
import Reset from "./components/reset-icon";
import ChatApp from "./components/chat/chat-app";
import CustomIframe from "./components/chat/custom-iframe";

const LivePage: React.FC = () => {
  const {
    chatUser,
    setMode,
    setSong,
    setSongs,
    setNumQuestions,
    setCurrentQuestionIndex,
    setQuestions,
    setOptions,
    setResponses,
    setFinalPrompt,
    setImageUrl,
  } = useAppContext();

  useEffect(() => {
    reset();
    return () => {
      reset();
    };
  }, []);

  const reset = useCallback(async () => {
    setMode("");
    setSong("");
    setSongs("");
    setNumQuestions(0);
    setCurrentQuestionIndex(0);
    setQuestions([]);
    setOptions([]);
    setResponses({});
    setFinalPrompt("");
    setImageUrl("");
  }, []);

  return (
    <>
      <div className="flex flex-col gap-8 pl-8 pr-8 pb-8">
        <div className="flex md:flex-row sm:flex-col h-auto gap-8 ">
          <div className="text-center md:w-3/4 sm:w-full border rounded-lg p-1">
            <Suspense fallback={<PlayerLoading />}>
              <PlayerWithControls
                playbackId={
                  process.env.NEXT_PUBLIC_LIVEPEER_LIVESTREAM_PLAYBACKID!
                }
              />
            </Suspense>
          </div>
          <div className="hover:bg-slate-50/15 text-center md:w-1/4 sm:w-full bg-slate-50/10 rounded-lg">
            <CustomIframe
              stylesheetUrl="/css/index.css"
              className="border"
              width="100%"
              height="100%"
              inlineStyles={`body { margin: 0; padding: 0px; background-color: #1a1a1a; color: #ffffff; }`}
            >
              <ChatApp userId={chatUser.userId} userName={chatUser.userName} />
            </CustomIframe>
          </div>
        </div>
        <div className="text-center w-full h-auto border rounded-lg p-2">
          <Button
            className="float-right m-2 mb-16 rounded-full"
            size="sm"
            onClick={reset}
          >
            <Reset />
          </Button>
          <Generate routeId="live" />
        </div>
      </div>
    </>
  );
};

export default LivePage;
