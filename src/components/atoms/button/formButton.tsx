"use client";

import { ReactElement } from "react";
import { FormButtonType } from "@/types/components/atoms/button/FormButtonType";
import { ColorMapType } from "@/types/components/common/ColorMapType";

const FormButton = ({ color, text, onClick, disabled }: FormButtonType): ReactElement => {
  const colorMap: ColorMapType = {
    red: "bg-[#E63B3D]",
    green: "bg-[#3D9727]",
    lightblue: "bg-[#26B5E3]",
    gray: "bg-[#5B5B5B]",
    default: "bg-white",
  };

  const bgColor = colorMap[color] || colorMap["default"];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${bgColor}
        w-80 py-3 inline-flex justify-center items-center text-white
        text-sm font-medium rounded-sm cursor-pointer
        hover:brightness-95 disabled:opacity-50 disabled:pointer-events-none
      `}
    >
      {text}
    </button>
  );
};

export default FormButton;
