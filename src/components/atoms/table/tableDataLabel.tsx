"use client";

import React, { ReactElement } from "react";
import { TableDataLabelType } from "@/types/components/atoms/table/TableDataLabelType";

const TableDataLabel = ({
  text,
  textColor = "text-[#000]",
  labelText,
  labelType = "balance",
}: TableDataLabelType): ReactElement => {
  return (
    <td className="px-3 py-3 whitespace-nowrap text-xs text-gray-800
    border-solid border-[#D4CECE] border align-middle"
    >
      <span className={`${textColor} block`}>{text}</span>
      {labelType === "balance" &&
        <span className="bg-[#E63B3D] text-white px-2.5 py-0.5 text-center rounded-md block mt-1">{labelText}</span>
      }
      {labelType === "cart" &&
        <span className="bg-[#26B5E3] text-white px-2.5 py-0.5 text-center rounded-md block mt-1">{labelText}</span>
      }
    </td>
  );
};

export default TableDataLabel;
