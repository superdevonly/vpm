import Button from "@repo/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xl font-bold">Not Found</div>
      <div className="mb-8">Could not find requested resource</div>
      <Button size="lg" asChild>
        <Link href={"/"}>Go Back Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
