"use client";

import { ReactElement } from "react";
import { TableHeadingType } from "@/types/components/atoms/table/TableHeadingType";

const TableHeading = ({
  text,
  textColor = "text-gray-500",
  minWidth,
  width,
  fontSize = "14px",
}: TableHeadingType): ReactElement => {
  const classNames = `
  px-4 py-3 text-start font-medium uppercase
  border-[#E5E7EB] bg-[#F9FAFB] ${textColor} ${minWidth} text-[${fontSize}] ${width ? width : "whitespace-nowrap"}`;
  return (
    <th scope="col" className={classNames}>
      {text}
    </th>
  );
};

export default TableHeading;
