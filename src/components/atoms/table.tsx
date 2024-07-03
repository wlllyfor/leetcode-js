"use client";

import { TableType } from "@/types/components/atoms/TableType";
import { ReactElement } from "react";
import classes from "@/styles/components/atoms/table.module.scss";

const Table = ({ children }: TableType): ReactElement => {
  const classNames: string[] = [ classes.table ];
  return (
    <table className={classNames.join(" ")}>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;
