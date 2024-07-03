"use client";

import { ReactElement } from "react";
import { FlexWrapperType } from "@/types/components/atoms/div/wrapper/FlexWrapperType";

const FlexWrapperLg = ({ children }: FlexWrapperType): ReactElement => {
  return (
    <div
      className="relative w-fill pb-2 flex gap-6 items-start last:pb-0"
    >
      {children}
    </div>
  );
};

export default FlexWrapperLg;
