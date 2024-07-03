"use client";

import React, { ReactElement } from "react";
import Image from "next/image";
import { TableDataImageAndTagType } from "@/types/components/atoms/table/TableDataImageAndTagType";

const TableDataImage = ({
  imageUrl,
  labelText,
  width,
  noRightBorder,
}: TableDataImageAndTagType): ReactElement => {
  const className = `
  px-3 py-3 whitespace-nowrap text-xs text-gray-800 border-solid border-[#D4CECE] border-l border-t border-b ${noRightBorder ? "border-r-0" : "border-r"} ${width}
  `;
  return (
    <td className={className}>
      <span className="bg-[#26B5E3] text-white px-2.5 py-0.5 text-center rounded-xl block">{labelText}</span>
      <Image src={imageUrl} alt="" width={50} height={33} className="mt-1 mx-auto" />
    </td>
  );
};

export default TableDataImage;
