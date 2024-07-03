"use client";

import { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import Paragraph from "@/components/atoms/text/paragraph";
import { AlibabaProductData } from "@/types/alibaba/searchAlibabaProductType";
import { HubDbTableType } from "@/types/db/hub";
import { getCustomerFrontUrl, routes } from "@/routes";

const MallProduct = ({ product, hub, widthClassName }: {
  product: AlibabaProductData;
  hub: HubDbTableType;
  widthClassName?: string;
}): ReactElement => {

  const name = hub.currency.name;
  const nameTpJp = hub.currency.nameToJp;
  const unitName = `${nameTpJp}(${name})`;

  const productUrl = getCustomerFrontUrl(hub.code, routes.front.customer.order.mall.product.url);

  return (
    <div className={`p-3 ${widthClassName ? widthClassName : "w-1/5"}`}>
      <Link href={`${productUrl}?product_id=${product.offerId}`}>
        <Image src={product.imageUrl} alt="" className="rounded" width={100} height={100} />
        <div className="mt-2">
          <div className="line-clamp-2">
            <Paragraph text={product.subjectTrans} />
          </div>
          <div className="flex items-baseline mt-1 text-sm">
            <Paragraph text={`${product.priceInfo.price}${unitName}`} color="[#E63B3D]" isBold />
            {/*<div className="ml-1">*/}
            {/*  <Paragraph text={`(${product.japaneseFee}${product.japaneseUnit})`} fontSize="10px" color="[#E63B3D]" />*/}
            {/*</div>*/}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MallProduct;
