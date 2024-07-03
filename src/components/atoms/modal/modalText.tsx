"use client";

import { ReactElement } from "react";
import { ModalTextType } from "@/types/components/atoms/modal/ModalTextType";

const ModalText = ({ text }: ModalTextType): ReactElement => {
  return <p className="text-sm mb-4">{text}</p>;
};

export default ModalText;
