"use client";

import { ReactElement } from "react";
import { HeaderWrapperType } from "@/types/components/atoms/div/wrapper/HeaderWrapperType";

const HeaderWrapper = ({ children }: HeaderWrapperType): ReactElement => {
  return <div className="bg-[#000] p-3 flex justify-between z-20 fixed w-full">{children}</div>;
};

export default HeaderWrapper;
