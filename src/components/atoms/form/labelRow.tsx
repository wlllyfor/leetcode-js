"use client";

import { ReactElement } from "react";
import { LabelType } from "@/types/components/atoms/form/LabelType";

const LabelRow = ({ text, children, isRequired }: LabelType): ReactElement => {
  return (
    <label className="block text-xs font-medium text-gray-900">
      {text}
      {children}
      {isRequired && <span className="text-red">*</span>}
    </label>
  );
};

export default LabelRow;
