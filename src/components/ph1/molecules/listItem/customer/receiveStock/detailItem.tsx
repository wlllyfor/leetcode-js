"use client";

import { ReactElement } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Image from "next/image";
import Paragraph from "@/components/atoms/paragraph";
import ImageSrc from "@/resource/img/dummy.jpg";
import { ReceiveStockDetailDbTableType } from "@/types/db/receiveStock/receiveStockDetail";
import Details from "@/components/atoms/details";
import Summary from "@/components/atoms/summary";

const DetailItem = ({ receiveStockDetail }: { receiveStockDetail: ReceiveStockDetailDbTableType; }): ReactElement => {
  const classNamesMr16 = [
    commonClasses.flex__wrapper,
    commonClasses.aline_center,
    commonClasses.mt_8,
    commonClasses.c_mr_16,
  ];

  return (
    <>
      <WhiteWideWrapper isDetail>
        <Details>
          <Summary>
            <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center}`}>
              <div className={commonClasses.ml_16}>
                <div className={classNamesMr16.join(" ")}>
                  <Paragraph>{receiveStockDetail.product?.name || "無効な商品"}</Paragraph>
                </div>
              </div>
            </div>
          </Summary>
          <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.ml_16}`}>
            <div>
              <Image src={receiveStockDetail.product?.productImageUrl || ImageSrc} alt={""} width={120} height={80} />
            </div>
            <div className={commonClasses.ml_16}>
              <div className={classNamesMr16.join(" ")}>
                <Paragraph>お客様SKU：{receiveStockDetail.product?.sku}</Paragraph>
                <Paragraph>入庫数：{receiveStockDetail.receiveQuantity.toLocaleString()}</Paragraph>
              </div>
            </div>
          </div>
        </Details>
      </WhiteWideWrapper>
    </>
  );
};

export default DetailItem;
