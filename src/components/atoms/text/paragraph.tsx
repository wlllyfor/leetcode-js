"use client";

import { ReactElement } from "react";
import { ParagraphType } from "@/types/components/atoms/text/ParagraphType";

const Paragraph = ({
  text,
  children,
  color = "[#1F2937]",
  fontSize = "14px",
  isBold,
  onClick,
}: ParagraphType): ReactElement => {
  const fontWeightClass = isBold ? "font-bold" : "";
  return <p className={`text-[${fontSize}] text-${color} ${fontWeightClass}`} onClick={onClick}>{text}{children}</p>;
};

export default Paragraph;
