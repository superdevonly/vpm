"use client";
import { Step, StepItem, Stepper } from "@repo/ui/stepper";
import React from "react";
import { StepperFooter } from "../(app)/_components/stepper-footer";
import { CurateItems } from "../(curate-items)/_components/curate-items";
import { Settings } from "../(settings)/_components/settings";
import { StyleSelection } from "../(style-selection)/_components/style-selection";
import { CompositionStyles } from "../(composition-styles)/_components/composition-styles";
import { FinalItems } from "../(final-items)/_components/final-items";
import Questions from "../(questions)/_components/questions";

const steps = [
  { label: "Questions" },
  { label: "Choose Style" },
  { label: "Settings" },
  { label: "Composition" },
  { label: "Curate Collection" },
  // { label: "Final Collection" },
] satisfies StepItem[];

const NftCollectionPage: React.FC = () => {
  return (
    <div className="w-full h-full mx-auto">
      <div className="flex flex-col items-center h-full gap-4">
        <Stepper
          variant="line"
          initialStep={0}
          steps={steps}
          className="flex w-full"
          styles={{
            "main-container": "px-28",
          }}
        >
          {steps.map((stepProps, index) => {
            return (
              <Step className="px-28" key={stepProps.label} {...stepProps}>
                {index + 1 === 1 && <Questions />}
                {index + 1 === 2 && <StyleSelection />}
                {index + 1 === 3 && <Settings />}
                {index + 1 === 4 && <CompositionStyles />}
                {index + 1 === 5 && <CurateItems />}
                {/* {index + 1 === 6 && } */}
              </Step>
            );
          })}
          <StepperFooter />
        </Stepper>
      </div>
    </div>
  );
};

export default NftCollectionPage;
