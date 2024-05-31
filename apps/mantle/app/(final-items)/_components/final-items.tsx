import { StepHEader } from "@/components/step-header";
import { FinalItem } from "./final-item";

const FinalItems = () => {
  return (
    <div className="flex flex-col gap-10 px-6">
      <StepHEader description="Congrats! This's your final colelction that now can be saved and deployed" />
      <div className="relative grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
          <FinalItem imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP1QyMhYL3C37VR5TGaVua832_ureLkwjg4QS7M3XboQ&s" />
        ))}
      </div>
    </div>
  );
};

export { FinalItems };
