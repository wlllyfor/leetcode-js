"use client";

import { ReactElement } from "react";
import { TableHeadingType } from "@/types/components/atoms/table/TableHeadingType";

const TableHeadingFirst = ({ text, minWidth, width }: TableHeadingType): ReactElement => {
  const className = `
  px-4 py-3 text-end text-xs font-medium text-gray-500 uppercase
  border-[#E5E7EB] bg-[#F9FAFB] ${minWidth} ${width}
`;
  return (
    <th
      scope="col"
      className={className}
    >
      {text}
    </th>
  );
};

export default TableHeadingFirst;
