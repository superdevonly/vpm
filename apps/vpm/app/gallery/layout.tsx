"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/tabs";

const GalleryLayout = ({
  videos,
  images,
}: {
  videos: React.ReactNode;
  images: React.ReactNode;
}) => {
  return (
    <div className="px-8 my-28">
      <Tabs defaultValue="images">
        <TabsList className="w-full">
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        <TabsContent value="images">{images}</TabsContent>
        <TabsContent value="videos">{videos}</TabsContent>
      </Tabs>
    </div>
  );
};

export default GalleryLayout;
