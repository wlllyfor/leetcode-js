"use client";

import { ReactElement } from "react";
import { ButtonAreaWrapperType } from "@/types/components/atoms/div/wrapper/ButtonAreaWrapperType";

const ButtonAreaWrapper = ({ children }: ButtonAreaWrapperType): ReactElement => {
  return <div className="mb-4 w-full">{children}</div>;
};

export default ButtonAreaWrapper;
