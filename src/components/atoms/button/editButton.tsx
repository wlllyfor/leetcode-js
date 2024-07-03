"use client";

import { EditButtonType } from "@/types/components/atoms/button/EditButtonType";
import { ReactElement } from "react";

const EditButton = ({ text, clickFunction }: EditButtonType): ReactElement => {
  return (
    <button className="flex items-center cursor-pointer" onClick={clickFunction}>
      <span className="text-[#26B5E3] text-[12px] text-bold">{text}</span>
      <span className="material-symbols-outlined text-[#26B5E3] text-[16px]">edit_square</span>
    </button>
  );
};

export default EditButton;
