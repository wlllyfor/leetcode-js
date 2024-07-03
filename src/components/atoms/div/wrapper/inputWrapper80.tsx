"use client";

import { ReactElement } from "react";
import { InputWrapperType } from "@/types/components/atoms/div/wrapper/InputWrapperType";

const InputWrapper80 = ({ children }: InputWrapperType): ReactElement => {
  return <div className="relative rounded-md w-80 m-auto">{children}</div>;
};

export default InputWrapper80;
