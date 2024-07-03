"use client";

import { ReactElement } from "react";
import { LabelType } from "@/types/components/atoms/form/LabelType";

const Label = ({ text, children, isRequired, htmlFor, hover, fontSize="14px" }: LabelType): ReactElement => {
  const className = `block mb-1 text-xs font-medium text-left text-[${fontSize}] ${hover ? "text-[#2563EB] underline decoration-1": "text-gray-900"}`;
  return (
    <label className={className} htmlFor={htmlFor}>
      {text}
      {children}
      {isRequired && <span className="text-[#E63B3D]">*</span>}
    </label>
  );
};

export default Label;
