"use client";
import { cn } from "@repo/ui/utils";
import Image from "next/image";
import { useState } from "react";

const CurateItem = ({ imageUrl }: any) => {
  const [checkedItemClass, setCheckedItemClass] = useState("");

  const handleOnClick = () => {
    setCheckedItemClass(checkedItemClass === "" ? "!border-white" : "");
  };

  return (
    <div
      onClick={() => handleOnClick()}
      className={cn(
        "overflow-hidden border rounded-md relative hover:cursor-pointer",
        checkedItemClass
      )}
    >
      {/* <Checkbox className="absolute top-5" /> */}
      <Image alt="Composition image" src={imageUrl} width={500} height={500} />
    </div>
  );
};

export { CurateItem };
