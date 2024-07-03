"use client";

import { ReactElement } from "react";
import { TableType } from "@/types/components/atoms/table/TableType";

const Table = ({ children, layout = "table-auto", width }: TableType): ReactElement => {
  const className = `divide-y divide-gray-200 w-full ${layout} ${width}`;
  return (
    <table className={className}>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
