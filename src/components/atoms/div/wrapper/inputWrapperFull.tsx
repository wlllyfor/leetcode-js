"use client";

import { ReactElement } from "react";
import { InputWrapperType } from "@/types/components/atoms/div/wrapper/InputWrapperType";

const inputWrapperFull = ({ children }: InputWrapperType): ReactElement => {
  return <div className="relative rounded-md ">{children}</div>;
};

export default inputWrapperFull;
