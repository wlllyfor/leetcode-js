"use client";

import { ReactElement } from "react";
import { TableDataChildrenType } from "@/types/components/atoms/table/TableDataChildrenType";

const TableDataChildren = ({ children }: TableDataChildrenType): ReactElement => {
  return (
    <td
      className="
        px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-800
        border-solid border-[#D4CECE] border
      "
    >
      {children}
    </td>
  );
};

export default TableDataChildren;
