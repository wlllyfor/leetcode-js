"use client";

import { ReactElement } from "react";
import { FlexWrapperType } from "@/types/components/atoms/div/wrapper/FlexWrapperType";

const FlexWrapper = ({ children, isReverse, alignItem }: FlexWrapperType): ReactElement => {

  const classNamesForReverse = isReverse ? "flex-row-reverse justify-end" : "";
  const classNamesForAlignItem = alignItem ?? "items-center";

  return (
    <div className={`relative w-fill flex gap-2 ${classNamesForAlignItem} last:pb-0 ${classNamesForReverse}`}>
      {children}
    </div>
  );
};

export default FlexWrapper;
