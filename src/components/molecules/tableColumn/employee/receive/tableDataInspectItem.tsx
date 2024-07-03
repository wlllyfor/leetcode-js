"use client";

import React, { ReactElement } from "react";
import NormalClickableButton from "@/components/atoms/button/normalClickableButton";
import EditButton from "@/components/atoms/button/editButton";
import { TableDataInspectItemType } from "@/types/components/molecules/tableColumn/employee/receive/TableDataInspectItemType";

const tableDataInspectItem = ({ text, width, clickFunction, isDisable }: TableDataInspectItemType): ReactElement => {
  const classNames = `
    px-3 py-3 whitespace-nowrap text-xs text-gray-800 text-[10px]
    border-solid border-[#D4CECE] border align-middle ${width}
  `;

  return (
    <td className={classNames}>
      <div className="mt-2 w-fit">
        <EditButton text={text} />
      </div>
      <div className="mt-2">
        <NormalClickableButton color="lightblue" text={"入荷検品完了"} pxSize="1" fontSize="11px" onClick={clickFunction} disabled={isDisable} />
      </div>
    </td>
  );
};

export default tableDataInspectItem;
