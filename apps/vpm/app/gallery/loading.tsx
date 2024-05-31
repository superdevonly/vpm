import { Loader } from "@repo/ui/loader";

const LoadingGallery = () => {
  return (
    <div className="mt-12 flex w-full items-center justify-center gap-2">
      <Loader />
      Loading...
    </div>
  );
};
export default LoadingGallery;
