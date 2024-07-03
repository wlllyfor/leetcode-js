"use client";

import { ReactElement } from "react";
import { TableDataTextsWithButtonType } from "@/types/components/atoms/table/TableDataTextsWithButtonType";

const TableDataTextsWithButton = ({
  texts,
  labelText,
  labelType = "balance",
  width,
}: TableDataTextsWithButtonType): ReactElement => {
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
      {labelType === "balance" &&
        <span className="bg-[#E63B3D] text-white px-2.5 py-0.5 text-center rounded-md block mt-1">{labelText}</span>
      }
      {labelType === "cart" &&
        <span className="bg-[#26B5E3] text-white px-2.5 py-0.5 text-center rounded-md block mt-1">{labelText}</span>
      }
    </td>
  );
};

export default TableDataTextsWithButton;
