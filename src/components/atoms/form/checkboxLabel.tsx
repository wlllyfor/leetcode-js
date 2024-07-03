"use client";

import { ReactElement } from "react";
import { LabelType } from "@/types/components/atoms/form/LabelType";

const CheckboxLabel = ({ text, children, fontSize = "9px", htmlFor }: LabelType): ReactElement => {
  return (
    <label htmlFor={htmlFor} className={`text-[${fontSize}] text-gray-900 cursor-pointer`}>
      {text}
      {children}
    </label>
  );
};

export default CheckboxLabel;
