"use client";

import { ReactElement } from "react";
import { TableButtonType } from "@/types/components/atoms/button/TableButtonType";
import { ColorMapType } from "@/types/components/common/ColorMapType";

const TableButton = ({ color, text, handleClick }: TableButtonType): ReactElement => {
  const colorMap: ColorMapType = {
    red: "text-[#E63B3D]",
    blue: "text-[#6B6DA6]",
    default: "text-white",
  };

  const textColor = colorMap[color] || colorMap["default"];

  return (
    <button
      onClick={handleClick}
      className={`
        ${textColor}
        w-fit py-1 inline-flex justify-center items-center gap-x-2 font-bold
        text-sm font-medium cursor-pointer
        hover:brightness-95 disabled:opacity-50 disabled:pointer-events-none
      `}
    >
      {text}
    </button>
  );
};

export default TableButton;
