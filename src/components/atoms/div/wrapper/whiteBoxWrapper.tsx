"use client";

import { ReactElement } from "react";
import { WhiteBoxWrapperType } from "@/types/components/atoms/div/wrapper/WhiteBoxWrapperType";

const WhiteBoxWrapper = ({ children }: WhiteBoxWrapperType): ReactElement => {
  return <div className="p-[30px] bg-[#FFF] w-[380px] rounded-md">{children}</div>;
};

export default WhiteBoxWrapper;
