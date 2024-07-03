"use client";

import React, { ReactElement } from "react";
import { TableDataTextsWithLabelType } from "@/types/components/atoms/table/TableDataTextsWithLabelType";
import { UUID } from "@/lib/uuid";
import { enumOrderType } from "@/types/enum/enumOrderType";

const TableDataTextsWithLabel = ({
  texts,
  labelText,
  labelType = "balance",
  width,
  rowSpan= 1,
}: TableDataTextsWithLabelType): ReactElement => {
  const classNames = `
    px-3 py-3 whitespace-nowrap text-xs text-gray-800
    border-solid border-[#D4CECE] border align-middle ${width}
  `;

  return (
    <td className={classNames} rowSpan={rowSpan}>
      {labelType === "staff" &&
        <span className="bg-[#50676C] text-white px-2.5 py-0.5 text-center rounded-xl block mb-1">{labelText}</span>
      }
      {texts.map(text => (
        <span key={UUID.generate()} className="block">
          {text}
        </span>
      ))}
      {labelType === "balance" &&
        <span className="bg-[#E63B3D] text-white px-2.5 py-0.5 text-center rounded-md block mt-1">{labelText}</span>
      }
      {(labelType === enumOrderType.cart || labelType === enumOrderType.oem) &&
        <span className="bg-[#26B5E3] text-white px-2.5 py-0.5 text-center rounded-md block mt-1">{labelText}</span>
      }
    </td>
  );
};

export default TableDataTextsWithLabel;
