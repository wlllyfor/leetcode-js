"use client";

import { CloseButtonType } from "@/types/components/atoms/button/CloseButtonType";
import { ReactElement } from "react";

const CloseButton = ({ clickFunction }: CloseButtonType): ReactElement => {
  return (
    <button className="text-[24px] cursor-pointer leading-[130%]" onClick={clickFunction}>
      ×
    </button>
  );
};

export default CloseButton;
