"use client";

import { TabButtonType } from "@/types/components/ph2/atoms/button/TabButtonType";
import { ReactElement } from "react";
import { ColorMapType } from "@/types/components/common/ColorMapType";

const TabButton = ({ clickFunction, children, isActive, color }: TabButtonType): ReactElement => {
  const colorMap: ColorMapType = {
    yellow: "bg-[#e5a500]",
    blue: "bg-[#323673]",
    lightBlue: "bg-[#26b5e3]",
    default: "bg-[#cccccc]",
  };

  // isActive かつ、colorが決まっている場合はその色を反映する。
  // 決まっていない場合はblueを使用。isActiveではないものはdefaultカラーにする
  const bgColor = isActive ? (color ? colorMap[color] : colorMap["blue"]) : colorMap["default"];

  const paddingBottom = isActive ? "rounded-b-none" : "mb-1";

  return (
    <button
      className={`w-[180px] text-center text-white rounded-md p-3 ${bgColor} ${paddingBottom}`}
      onClick={clickFunction}
    >
      {children}
    </button>
  );
};

export default TabButton;
