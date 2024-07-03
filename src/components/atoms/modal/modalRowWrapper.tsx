"use client";

import { ReactElement } from "react";
import { ModalRowWrapperType } from "@/types/components/atoms/modal/ModalRowWrapperType";

const ModalRowWrapper = ({ children }: ModalRowWrapperType): ReactElement => {
  return <div className="mb-12 w-full">{children}</div>;
};

export default ModalRowWrapper;
