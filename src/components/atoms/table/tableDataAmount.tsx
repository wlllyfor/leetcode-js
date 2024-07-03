"use client";

import React, { ReactElement } from "react";
import Image from "next/image";
import { TableDataAmountType } from "@/types/components/atoms/table/TableDataAmountType";

const TableDataTexts = ({ texts, width, totalText, rowSpan = 1 }: TableDataAmountType): ReactElement => {
  const classNames = `
    px-3 py-3 text-xs text-gray-800 whitespace-nowrap border-solid border-[#D4CECE] border
    align-middle ${width}
  `;

  return (
    <td className={classNames} rowSpan={rowSpan}>
      <span className="flex">
        {totalText}
        <Image src="/images/icon/icon_arrow_down.svg" alt="プラスアイコン" width={13} height={9} />
      </span>
      {texts.map(text => (
        <span key={text} className="block ml-3">
          {text}
        </span>
      ))}
    </td>
  );
};

export default TableDataTexts;
