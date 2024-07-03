"use client";

import React, { ReactElement } from "react";
import Image from "next/image";
import { TableDataImageType } from "@/types/components/atoms/table/TableDataImageType";

const TableDataImage = ({
  text,
  textColor = "text-[#000]",
  imageUrl,
  width,
  isTextTop = true,
  isTextBottom = false,
}: TableDataImageType): ReactElement => {
  isTextTop = isTextTop && !isTextBottom;
  isTextBottom = !isTextTop && isTextBottom;
  const className = `
  px-3 py-3 whitespace-nowrap text-xs text-gray-800 border-solid border-[#D4CECE] border align-middle ${width}
`;
  return (
    <td className={className}>
      {isTextTop && (
        <span className={textColor}>{text}</span>
      )}
      <Image src={imageUrl} alt="" width={50} height={33} onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => (e.target as HTMLImageElement).style.display = 'none'}/>
      {isTextBottom && (
        <span className={textColor}>{text}</span>
      )}
    </td>
  );
};

export default TableDataImage;
