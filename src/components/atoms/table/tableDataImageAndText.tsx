"use client";

import React, { ReactElement } from "react";
import Image from "next/image";
import { TableDataImageAndTextType } from "@/types/components/atoms/table/TableDataImageAndTextType";
import Paragraph from "@/components/atoms/text/paragraph";
import { If, Then } from "react-if";

const TableDataImageAndText = ({
  imageUrl,
  text,
  width,
  noRightBorder,
}: TableDataImageAndTextType): ReactElement => {
  const className = `
  px-3 py-3 whitespace-nowrap text-xs text-gray-800 border-solid border-[#D4CECE] border-l border-t border-b ${
  noRightBorder ? "border-r-0" : "border-r"
} ${width}
  `;
  return (
    <td className={className}>
      <div className="flex justify-start">
        <If condition={imageUrl}>
          <Then>
            <Image src={imageUrl as string} alt="" width={50} height={33} className="mt-1 mr-4" />
          </Then>
        </If>
        <Paragraph text={text} fontSize="12px" />
      </div>
    </td>
  );
};

export default TableDataImageAndText;
