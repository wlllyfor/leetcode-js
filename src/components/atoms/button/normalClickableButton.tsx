"use client";

import { ReactElement } from "react";
import { NormalClickableButtonType } from "@/types/components/atoms/button/NormalClickableButtonType";
import { ColorMapType } from "@/types/components/common/ColorMapType";

const NormalClickableButton = ({
  color,
  text,
  pxSize = "6",
  fontSize = "14px",
  onClick,
  disabled,
}: NormalClickableButtonType): ReactElement => {
  const colorMap: ColorMapType = {
    red: "bg-[#E63B3D]",
    blue: "bg-[#6B6DA6]",
    lightblue: "bg-[#26B5E3]",
    yellow: "bg-[#E39500]",
    gray: "bg-[#CCCCCC]",
    purple: "bg-[#6B6DA6]",
    default: "bg-white",
  };

  const bgColor = colorMap[color] || colorMap["default"];

  return (
    <button
      onClick={onClick}
      className={`
        ${bgColor}
        w-fit py-2 px-${pxSize} inline-flex justify-center items-center gap-x-2 text-white
        text-[${fontSize}] font-medium rounded-lg border border-gray-200 text-gray-800 cursor-pointer
        shadow-sm hover:brightness-95 disabled:opacity-50 disabled:pointer-events-none
      `}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default NormalClickableButton;
