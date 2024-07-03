"use client";

import { ReactElement } from "react";
import { InputWrapperType } from "@/types/components/atoms/div/wrapper/InputWrapperType";

const InputWrapper24 = ({ children }: InputWrapperType): ReactElement => {
  return <div className="relative rounded-md w-24">{children}</div>;
};

export default InputWrapper24;
