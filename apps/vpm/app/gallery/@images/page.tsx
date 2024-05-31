import { fetchUserAssetsFromS3 } from "@/lib/aws";
import { getPrivyUser } from "@/lib/privy";
import { cookies } from "next/headers";
import Image from "next/image";

const getImages = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("privy-token")?.value;
  try {
    console.log("HOST image", process.env.NEXT_PUBLIC_APP_URL);

    if (!token) return null;
    const user = await getPrivyUser(token);

    const items = (await fetchUserAssetsFromS3(user.userId)).map((item) => ({
      ...item,
    }));

    if (items.length === 0) {
      return null;
    }

    return items;
  } catch (error) {
    console.log("image ERROR", error);
  }
};

const ImagesGallery = async () => {
  const images = await getImages();

  return (
    <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {images &&
        images
          .filter((image: any) => image.type === "image")
          .map((image: any, index: number) => (
            <Image
              key={index}
              width="0"
              height="0"
              sizes="100vw"
              className="h-auto w-full rounded-lg object-cover"
              src={image.url}
              alt={`Gallery item ${index}`}
            />
          ))}
    </div>
  );
};

export default ImagesGallery;
