"use client";

import { ReactElement } from "react";
import Image from "next/image";
import { TableDeleteIconButtonType } from "@/types/components/atoms/button/TableDeleteIconButtonType";

const TableButton = ({ handleClick }: TableDeleteIconButtonType): ReactElement => {
  return (
    <button
      onClick={handleClick}
      className={`
        w-fit py-1 inline-flex justify-center items-center gap-x-2 cursor-pointer
        hover:brightness-95 disabled:opacity-50 disabled:pointer-events-none
      `}
    >
      <Image src="/images/icon/icon_delete.svg" alt="ゴミ箱アイコン" width={18} height={18} />
    </button>
  );
};

export default TableButton;
