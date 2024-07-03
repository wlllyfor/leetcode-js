"use client";

import { ReactElement } from "react";
import { FormTextWrapperType } from "@/types/components/atoms/div/wrapper/FormTextWrapperType";

const FormTextWrapper = ({ children }: FormTextWrapperType): ReactElement => {
  return <div className="py-2">{children}</div>;
};

export default FormTextWrapper;
