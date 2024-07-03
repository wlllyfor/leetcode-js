"use client";

import { ReactElement } from "react";
import { MainInnerType } from "@/types/components/atoms/div/inner/MainInnerType";

const MallInner = ({ children }: MainInnerType): ReactElement => {
  return <div className="px-10 w-full max-h-full">{children}</div>;
};

export default MallInner;
