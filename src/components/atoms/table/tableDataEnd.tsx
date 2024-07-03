"use client";

import { ReactElement } from "react";
import { TableDataChildrenType } from "@/types/components/atoms/table/TableDataChildrenType";

const TableDataEnd = ({ children, align = "align-top", rowSpan = 1 }: TableDataChildrenType): ReactElement => {
  const className = `
    px-6 py-4 whitespace-nowrap text-end text-sm font-semibold border-solid border-[#D4CECE] border ${align}
  `;
  return (
    <td
      className={className}
      rowSpan={rowSpan}
    >
      {children}
    </td>
  );
};

export default TableDataEnd;
