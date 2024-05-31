import { FinalItems } from "@/app/(final-items)/_components/final-items";
import Button from "@repo/ui/button";
import { useStepper } from "@repo/ui/stepper";

const StepperFooter = () => {
  const {
    nextStep,
    prevStep,
    resetSteps,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
    isDisabledStep,
    steps,
    stepCount,
    currentStep,
  } = useStepper();

  console.log("stepCount", stepCount);
  console.log("currentStep", currentStep);

  return (
    <>
      {hasCompletedAllSteps && <FinalItems />}
      <div className="flex justify-end w-full gap-2 px-28">
        {hasCompletedAllSteps ? (
          <>
            {/* <Button size="lg" variant={} onClick={resetSteps}> */}
            <Button size="lg" variant="outline">
              Download as .zip
            </Button>
            <Button size="lg">Deploy</Button>
          </>
        ) : (
          currentStep?.label !== "Questions" && (
            <>
              <Button
                disabled={isDisabledStep}
                onClick={prevStep}
                size="lg"
                variant="outline"
              >
                Previous
              </Button>
              {currentStep?.label === "Curate Collection" && (
                <Button size="lg" variant="outline">
                  Regenerate
                </Button>
              )}
              <Button size="lg" onClick={nextStep}>
                {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
              </Button>
            </>
          )
        )}
      </div>
    </>
  );
};

export { StepperFooter };
