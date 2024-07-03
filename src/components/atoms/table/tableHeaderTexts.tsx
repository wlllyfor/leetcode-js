"use client";

import { ReactElement } from "react";
import { TableHeadingTextsType } from "@/types/components/atoms/table/TableHeadingTextsType";

const TableHeaderTexts = ({ texts, minWidth }: TableHeadingTextsType): ReactElement => {
  const className = `
    px-4 py-3 text-start text-sm font-medium text-gray-500 uppercase whitespace-nowrap
    border-[#E5E7EB] bg-[#F9FAFB] ${minWidth}
  `;
  return (
    <th scope="col" className={className}>
      {texts.map(text => (
        <span key={text} className="block">
          {text}
        </span>
      ))}
    </th>
  );
};

export default TableHeaderTexts;
