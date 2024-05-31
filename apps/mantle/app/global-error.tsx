"use server";
import Button from "@repo/ui/button";
import RootLayout from "./layout";

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <RootLayout>
      <div className="flex flex-col items-center gap-2">
        <div className="text-xl font-bold">Something went wrong</div>
        <div className="mb-8">{error.message}</div>
        <Button size="lg" onClick={() => reset()}>
          Refresh
        </Button>
      </div>
    </RootLayout>
  );
};

export default GlobalError;
