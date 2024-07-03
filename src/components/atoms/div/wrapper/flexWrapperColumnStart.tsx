"use client";

import { ReactElement } from "react";
import { FlexWrapperType } from "@/types/components/atoms/div/wrapper/FlexWrapperType";

const FlexWrapperColumnStart = ({ children }: FlexWrapperType): ReactElement => {
  return (
    <div
      className="
    relative w-fill pb-2 flex flex-col last:pb-0 items-start
  "
    >
      {children}
    </div>
  );
};

export default FlexWrapperColumnStart;
