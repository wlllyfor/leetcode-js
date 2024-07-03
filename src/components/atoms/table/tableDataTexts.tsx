"use client";

import React, { ReactElement } from "react";
import { TableDataTextsType } from "@/types/components/atoms/table/TableDataTextsType";

const TableDataTexts = ({ texts, width, createEmployeeId, rowSpan = 1, topAndBottomBorder }: TableDataTextsType): ReactElement => {
  const borderClass = topAndBottomBorder
    ? "border-t border-b border-r-0 border-l-0 border-solid border-[#D4CECE]"
    : "border-solid border-[#D4CECE] border";
  const classNames = `
    px-3 py-3 text-xs text-gray-800 whitespace-nowrap
    align-middle ${borderClass} ${width}
  `;

  return (
    <td className={classNames} rowSpan={rowSpan}>
      {createEmployeeId && (
        <span className="bg-[#50676C] text-[10px] text-white w-fit px-2.5 py-0.5 text-center rounded-lg block mt-1">
          スタッフ作成:{createEmployeeId}
        </span>
      )}
      {texts.map(text => (
        <span key={text} className="block">
          {text}
        </span>
      ))}
    </td>
  );
};

export default TableDataTexts;
