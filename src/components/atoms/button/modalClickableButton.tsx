"use client";

import { ReactElement } from "react";
import Image from "next/image";
import { ModalClickableButtonType } from "@/types/components/atoms/button/ModalClickableButtonType";
import { ColorMapType } from "@/types/components/common/ColorMapType";

const ModalClickableButton = ({ color, text, onClick, isAddIcon = false, isDisable }: ModalClickableButtonType): ReactElement => {
  const colorMap: ColorMapType = {
    red: "bg-[#E63B3D]",
    blue: "bg-[#6B6DA6]",
    lightblue: "bg-[#26B5E3]",
    yellow: "bg-[#E39500]",
    default: "bg-white",
  };

  const bgColor = colorMap[color] || colorMap["default"];

  return (
    <button
      onClick={onClick}
      className={`
        ${bgColor}
        w-fit py-1 px-2 inline-flex justify-center items-center gap-x-2 text-white
        text-xs rounded-md border border-gray-200 text-gray-800 cursor-pointer
        shadow-sm hover:brightness-95 disabled:opacity-50 disabled:pointer-events-none
      `}
    >
      {isAddIcon && (
        <button type="button" className="align-bottom ml-1">
          <Image src="/images/icon/icon_plus.svg" alt="プラスアイコン" width={14} height={14} />
        </button>
      )}
      {text}
    </button>
  );
};

export default ModalClickableButton;
