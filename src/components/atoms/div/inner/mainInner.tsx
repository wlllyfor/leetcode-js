"use client";

import { ReactElement } from "react";
import { MainInnerType } from "@/types/components/atoms/div/inner/MainInnerType";

const MainInner = ({ children }: MainInnerType): ReactElement => {
  return <div className="px-10 w-fit max-h-full">{children}</div>;
};

export default MainInner;
