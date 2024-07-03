"use client";

import { SpanType } from "@/types/components/atoms/text/SpanType";
import { ReactElement } from "react";

const Span = ({ text, color = "[#1F2937]", fontSize = "14px", isBold }: SpanType): ReactElement => {
  const fontWeight = isBold ? "font-bold" : "";
  return <span className={`text-[${fontSize}] text-${color} ${fontWeight}`}>{text}</span>;
};

export default Span;
