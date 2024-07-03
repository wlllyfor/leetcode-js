"use client";

import React, { ReactElement } from "react";
import Image from "next/image";
import { TableDataProductsType } from "@/types/components/atoms/table/TableDataProductsType";
import Paragraph from "@/components/atoms/text/paragraph";

const TableDataProducts = ({
  product,
}: TableDataProductsType): ReactElement => {
  const classNames = `
    px-3 py-3 text-xs text-gray-800 break-words whitespace-nowrap
    border-solid border-[#D4CECE] border align-middle
  `;

  return (
    <td className={classNames}>
      <div className="flex">
        <Image src="/images/dummy/dummy-image.png" alt="商品名の画像" width={50} height={50} />
        <div className="ml-2">
          <div className="flex gap-1">
            <span className="bg-[#26B5E3] text-white px-2.5 py-0.5 text-center rounded-md block mt-1">通常商品</span>
            <span className="bg-[#6C757D] text-white px-2.5 py-0.5 text-center rounded-md block mt-1">SKU: 111111</span>
            <span className="bg-[#6C757D] text-white px-2.5 py-0.5 text-center rounded-md block mt-1">JAN: 111111</span>
            <span className="bg-[#6C757D] text-white px-2.5 py-0.5 text-center rounded-md block mt-1">
              商品ID:YP2-14
            </span>
          </div>
          <div className="flex mt-1 gap-4">
            <Paragraph text={"商品名が入ります。"} />
            <Paragraph text={"数量10"} />
          </div>
        </div>
      </div>
    </td>
  );
};

export default TableDataProducts;
