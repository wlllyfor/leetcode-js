"use client";

import { ReactElement } from "react";
import { TableRowType } from "@/types/components/atoms/table/TableRowType";

const TableRow = ({ children, bgColor = "bg-white" }: TableRowType): ReactElement => {
  return <tr className={bgColor}>{children}</tr>;
};

export default TableRow;
