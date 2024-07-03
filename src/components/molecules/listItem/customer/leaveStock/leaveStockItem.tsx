"use client";

import { ReactElement } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Checkbox from "@/components/atoms/checkbox";
import { CheckBoxType } from "@/types/components/atoms/CheckBoxType";
import Image from "next/image";
import Paragraph from "@/components/atoms/paragraph";
import ImageSrc from "@/resource/img/dummy.jpg";
import CloseButton from "@/components/atoms/button/closeButton";
import Status from "@/components/molecules/status";
import SmallButton from "@/components/atoms/button/smallButton";

const LeaveStockItem = ({ id }: { id: string; }): ReactElement => {
  const checkboxProps: CheckBoxType = {
    id: id,
    isChecked: false,
    value: "",
    changeFunction: (): void => {
    },
  };

  const classNamesMr16 = [
    commonClasses.flex__wrapper,
    commonClasses.aline_center,
    commonClasses.mt_8,
    commonClasses.c_mr_16,
  ];

  const classNamesMbAuto = [
    commonClasses.flex__wrapper,
    commonClasses.aline_end,
    commonClasses.column,
    commonClasses.ml_auto,
    commonClasses.mr_16,
    commonClasses.mb_auto,
  ];

  return (
    <WhiteWideWrapper>
      <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center}`}>
        <Checkbox {...checkboxProps} />
        <div className={commonClasses.ml_16}>
          <Image src={ImageSrc} alt={""} width={120} height={80} />
        </div>
        <div className={commonClasses.ml_16}>
          <div className={classNamesMr16.join(" ")}>
            <Paragraph isBold>YP12345‐w01</Paragraph>
            <Paragraph>商品名商品名商品名商品名商品名</Paragraph>
          </div>
          <div className={classNamesMr16.join(" ")}>
            <Paragraph>お客様SKU：12345678</Paragraph>
            <Paragraph>追跡番号：12345678</Paragraph>
            <Paragraph>手数料：500円</Paragraph>
            <Paragraph>入庫数：100</Paragraph>
          </div>
          <div className={classNamesMr16.join(" ")}>
            <Paragraph>注文ID：YP12345‐T01</Paragraph>
            <Paragraph>出荷日：2023/10/20</Paragraph>
            <Paragraph>送料：500円</Paragraph>
          </div>
          <div className={classNamesMr16.join(" ")}>
            <Paragraph>配送先：東京都〇〇市～～町</Paragraph>
          </div>
          <div className={classNamesMr16.join(" ")}>
            <Paragraph>配送元：東京都〇〇市～～町</Paragraph>
          </div>
          <div className={classNamesMr16.join(" ")}>
            <Paragraph>備考：</Paragraph>
          </div>
        </div>
        <div className={classNamesMbAuto.join(" ")}>
          <div className={`${commonClasses.flex__wrapper}`}>
            <div className={commonClasses.mr_8}>
              <Paragraph isGray>2023.10.15 依頼</Paragraph>
            </div>
            <div className={commonClasses.mr_8}>
              <Paragraph isGray>2023.10.20 入荷予定</Paragraph>
            </div>
            <Status color={"dark"}>入荷待ち</Status>
          </div>
          <div className={commonClasses.mt_16}>
            <div className={commonClasses.mt_4}>
              <SmallButton text={"編集"} isBlue />
            </div>
            <div className={commonClasses.mt_4}>
              <SmallButton text={"削除"} isRed />
            </div>
          </div>
        </div>
      </div>
      <CloseButton clickFunction={() => {
      }}
      />
    </WhiteWideWrapper>
  );
};

export default LeaveStockItem;
