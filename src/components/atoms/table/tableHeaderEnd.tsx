"use client";

import { ReactElement } from "react";
import { TableHeadingType } from "@/types/components/atoms/table/TableHeadingType";

const TableHeadingEnd = ({ text }: TableHeadingType): ReactElement => {
  return (
    <th
      scope="col"
      className="
        px-4 py-3 text-end text-xs font-medium text-gray-500 uppercase
        border-[#E5E7EB] bg-[#F9FAFB]
      "
    >
      {text}
    </th>
  );
};

export default TableHeadingEnd;
