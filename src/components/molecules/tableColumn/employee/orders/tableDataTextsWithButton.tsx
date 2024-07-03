"use client";

import React, { ReactElement } from "react";
import TableDataButton from "@/components/atoms/button/tableDataButton";
import { TableDataTextsWithButtonType } from "@/types/components/molecules/tableColumn/employee/orders/TableDataTextsWithButtonType";

const TableDataTextsWithButton = ({ texts, buttonText, handleClick, width }: TableDataTextsWithButtonType): ReactElement => {
  const classNames = `
    px-3 py-3 whitespace-nowrap text-xs text-gray-800
    border-solid border-[#D4CECE] border align-middle ${width}
  `;

  return (
    <td className={classNames}>
      {texts.map(text => (
        <span key={text} className="block">
          {text}
        </span>
      ))}
      <div className="mt-2">
        <TableDataButton text={buttonText} color="lightblue" onClick={handleClick} />
      </div>
    </td>
  );
};

export default TableDataTextsWithButton;
