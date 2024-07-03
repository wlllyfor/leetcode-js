"use client";

import { SummaryType } from "@/types/components/atoms/toggle/SummaryType";
import { ReactElement } from "react";

const Summary = ({ children, isMenu }: SummaryType): ReactElement => {
  return (
    <summary className="cursor-pointer relative">
      <span
        className="material-symbols-outlined absolute top-0 left-[172px] transition-transform duration-300 open:transform-rotate-90"
      >expand_more</span>
      {children}
    </summary>
  );
};

export default Summary;
