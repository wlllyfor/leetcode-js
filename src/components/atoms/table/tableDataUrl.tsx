"use client";

import React, { ReactElement } from "react";
import Link from "next/link";
import { TableDataUrlType } from "@/types/components/atoms/table/TableDataUrlType";

const tableDataUrl = ({
  text,
  minWidth,
  width,
  linkColor,
  rowSpan = 1,
}: TableDataUrlType): ReactElement => {
  const classNames = `
    px-3 py-3 text-xs text-gray-800
    border-solid border-[#D4CECE] border align-middle break-words ${minWidth} ${width}
  `;

  const linkClassNames = `underline decoration-solid ${linkColor}`;

  return (
    <td className={classNames} rowSpan={rowSpan}>
      <Link href={text} className={linkClassNames}>
        {text}
      </Link>
    </td>
  );
};

export default tableDataUrl;
