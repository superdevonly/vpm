import Image from "next/image";

const CompositionStyleCard = ({ imageUrl }: any) => {
  return (
    <div className="overflow-hidden border rounded-md">
      <Image alt="Composition image" src={imageUrl} width={200} height={200} />
    </div>
  );
};
export { CompositionStyleCard };
