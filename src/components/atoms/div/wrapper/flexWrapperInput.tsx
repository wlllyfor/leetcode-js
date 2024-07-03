"use client";

import { ReactElement } from "react";
import { FlexWrapperType } from "@/types/components/atoms/div/wrapper/FlexWrapperType";

const FlexWrapperInput = ({ children }: FlexWrapperType): ReactElement => {
  return (
    <div
      className="
    relative w-fill pb-2 flex items-center last:pb-0
  "
    >
      {children}
    </div>
  );
};

export default FlexWrapperInput;
