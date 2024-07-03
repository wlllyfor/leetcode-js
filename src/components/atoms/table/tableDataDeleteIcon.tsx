"use client";

import React, { ReactElement } from "react";
import { TableDataDeleteIconType } from "@/types/components/atoms/table/TableDataDeleteIconType";

const tableDataDeleteIcon = ({
  id,
  handleClick,
  width,
}: TableDataDeleteIconType): ReactElement => {
  const classNames = `
    px-3 py-3 whitespace-nowrap text-xs text-gray-800
    border-solid border-[#D4CECE] border align-middle ${width}
  `;

  return (
    <td className={classNames}>
      <div className="mt-2 w-fit">
        <button id={id} onClick={handleClick}>
          <span className="material-symbols-outlined cursor-pointer">delete</span>
        </button>
      </div>
    </td>
  );
};

export default tableDataDeleteIcon;
