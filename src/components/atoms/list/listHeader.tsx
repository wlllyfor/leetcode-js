"use client";

import { ReactElement } from "react";
import { ListHeaderType } from "@/types/components/atoms/list/ListHeaderType";

const ListHeader = ({ text }: ListHeaderType): ReactElement => {
  return (
    <h2
      className="p-6 text-start text-sm font-medium border-solid border border-b-0 border-[#E5E7EB] bg-[#F9FAFB]"
    >{text}</h2>
  );
};

export default ListHeader;
