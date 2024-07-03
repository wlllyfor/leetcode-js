"use client";

import { ReactElement } from "react";
import { ModalTitleType } from "@/types/components/atoms/modal/ModalTitleType";

const ModalTitle = ({ text }: ModalTitleType): ReactElement => {
  return <h3 className="text-xl mb-4 text-center">{text}</h3>;
};

export default ModalTitle;
