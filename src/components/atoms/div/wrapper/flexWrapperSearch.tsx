"use client";

import { ReactElement } from "react";
import { FlexWrapperType } from "@/types/components/atoms/div/wrapper/FlexWrapperType";

const FlexWrapperSearch = ({ children }: FlexWrapperType): ReactElement => {
  return (
    <div
      className="relative w-fill pb-2 flex gap-2 items-end last:pb-0"
    >
      {children}
    </div>
  );
};

export default FlexWrapperSearch;
