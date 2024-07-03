"use client";

import { ReactElement } from "react";
import { TableHeadingType } from "@/types/components/molecules/tableColumn/employee/order/cart/TableHeadingType";

const TableHeading = ({
  text,
  textColor = "text-gray-800",
  fontSize = "text-sm",
  minWidth,
  colSpan = 1,
}: TableHeadingType): ReactElement => {
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
      {text}
    </th>
  );
};

export default TableHeading;
