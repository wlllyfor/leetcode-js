"use client";

import React, { ReactElement } from "react";
import Image from "next/image";
import { TableDataTextType } from "@/types/components/atoms/table/TableDataTextType";
import { Else, If, Then } from "react-if";

const TableData = ({
  text,
  textColor = "text-[#000]",
  isFormatNumber = false,
  isMemoButton = false,
  width,
  rowSpan = 1,
  topAndBottomBorder,
}: TableDataTextType): ReactElement => {
  const borderClass = topAndBottomBorder
    ? "border-t border-b border-r-0 border-l-0 border-solid border-[#D4CECE]"
    : "border-solid border-[#D4CECE] border";
  const classNames = `
    px-3 py-3 text-xs text-gray-800 break-words align-middle
    ${isFormatNumber ? "text-right" : ""} ${borderClass} ${width ? width + " overflow-wrap break-words whitespace-normal" : "whitespace-nowrap"}
  `;

  return (
    <td className={classNames} rowSpan={rowSpan}>
      {/* \nがあったら改行する */}
      <If condition={text && text.includes("\n")}>
        <Then>
          {text && text.split("\n").map((str, index) => (
            <span key={index} className={textColor}>
              {str}
              <br />
            </span>
          ))}
        </Then>
        <Else>
          <Then>
            <span className={textColor}>{text}</span>
          </Then>
        </Else>
      </If>
      {isMemoButton && (
        <button type="button" className="align-bottom ml-1">
          <Image src="/images/icon/icon_attachment.svg" alt="添付アイコン" width={10} height={18} />
        </button>
      )}
    </td>
  );
};

export default TableData;
