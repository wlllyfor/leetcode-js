"use client";

import { ReactElement } from "react";
import { TitleType } from "@/types/components/atoms/text/TitleType";

const Title = ({ text, isBold, color = "[#1F2937]", position = "center" }: TitleType): ReactElement => {
  const fontWeightClass = isBold ? "font-bold" : "";
  return <h2 className={`text-xl mb-4 text-${position} ${fontWeightClass} text-${color}`}>{text}</h2>;
};

export default Title;
