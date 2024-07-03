"use client";

import { ReactNode } from "react";
import { WhiteWideWrapperType } from "@/types/components/atoms/div/wrapper/WhiteWideWrapperType";

const whiteWideWrapper = ({ children }: WhiteWideWrapperType): ReactNode => {
  return <div className="bg-white p-4 mt-4">{children}</div>;
};

export default whiteWideWrapper;
