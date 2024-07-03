"use client";

import { ReactElement } from "react";
import Paragraph from "@/components/atoms/text/paragraph";
import Image from "next/image";
import ImageSrc from "@/resource/img/dummy.jpg";
import { ReceiveProductItemType } from "@/types/components/molecules/modalItem/employee/receive/ReceiveProductItemType";

const ReceiveProductItem = ({ product }: ReceiveProductItemType): ReactElement => {
  // product.name = null の場合altでエラーが出るので空の文字列を渡してます。
  product.name = product.name ?? "";

  return (
    <>
      <div className="flex gap-1">
        <span className="bg-[#6C757D] text-white text-[8px] px-1 py-0.5 text-left rounded-md block mt-1">
          SKU: {product.sku}
        </span>
        <span className="bg-[#6C757D] text-white text-[8px] px-1 py-0.5 text-left rounded-md block mt-1">
          {product.productLabelType}: {product.label}
        </span>
        <span className="bg-[#6C757D] text-white text-[8px] px-1 py-0.5 text-left rounded-md block mt-1">
          商品ID:{product.id}
        </span>
      </div>
      <div className="flex mt-1">
        <Image src={product.productImageUrl || ImageSrc} alt={product.name} width={50} height={20} />
        <div className="ml-2">
          <Paragraph text={product.name} fontSize="12px" />
        </div>
      </div>
    </>
  );
};

export default ReceiveProductItem;
