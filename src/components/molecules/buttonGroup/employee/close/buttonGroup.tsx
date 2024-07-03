"use client";

import { ReactElement } from "react";
import CloseButton from "@/components/atoms/button/closeButton";
import { CloseButtonType } from "@/types/components/atoms/button/CloseButtonType";

const ButtonGroup = ({ clickFunction }: CloseButtonType): ReactElement => {
  return (
    <div className="absolute top-0 right-0 translate-y-0 min-h-[34px]">
      <CloseButton clickFunction={clickFunction} />
    </div>
  );
};

export default ButtonGroup;
