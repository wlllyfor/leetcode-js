"use client";

import { ReactElement } from "react";
import { TableHeaderMiddleType } from "@/types/components/molecules/tableColumn/employee/orders/TableHeaderMiddleType";

const TableHeader = ({
  heading,
  text,
  textColor = "text-gray-800",
  fontSize = "text-sm",
  minWidth,
  colSpan = 1,
}: TableHeaderMiddleType): ReactElement => {
  const classNames = `
  px-3.5 py-1 text-start font-medium uppercase
  ${fontSize} ${textColor} ${minWidth}
`;
  return (
    <th
      scope="col"
      className={classNames}
      colSpan={colSpan}
    >
      <span className="font-bold">{heading}</span>
      {text}
    </th>
  );
};

export default TableHeader;
