"use client";

import { ReactElement } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Checkbox from "@/components/atoms/checkbox";
import Span from "@/components/atoms/span";
import { CheckBoxType } from "@/types/components/atoms/CheckBoxType";
import Image from "next/image";
import Paragraph from "@/components/atoms/paragraph";
import ImageSrc from "@/resource/img/dummy.jpg";
import Select from "@/components/atoms/select";
import Input from "@/components/atoms/input";
import CloseButton from "@/components/atoms/button/closeButton";
import { defaultReactSelectOption, ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

const OrderCartItem = ({ id }: { id: string; }): ReactElement => {
  const checkboxProps: CheckBoxType = {
    id: id,
    isChecked: false,
    value: "",
    changeFunction: (): void => {
    },
  };
  const options: ReactSelectOption[] = [ defaultReactSelectOption ];

  const classNamesMr16 = [
    commonClasses.flex__wrapper,
    commonClasses.aline_center,
    commonClasses.mt_8,
    commonClasses.c_mr_16,
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
            <Paragraph>
              <Span isBold>商品名商品名商品名商品名商品名</Span> / ショップ名
            </Paragraph>
            <Paragraph>商品ラベル：</Paragraph>
            <Input value={""} id={""} width15Per />
            <Paragraph>仕入れ先名：ショップ名</Paragraph>
            <Paragraph>商品URL：https://www.~~~~</Paragraph>
          </div>
          <div className={classNamesMr16.join(" ")}>
            <Paragraph>
              お客様SKU<span className={commonClasses.required}>*</span>：
            </Paragraph>
            <Input value={""} id={""} width15Per />
            <Paragraph>単価：500元 (CNY)</Paragraph>
            <Paragraph>その他金額：500元 (CNY)</Paragraph>
          </div>
          <div className={classNamesMr16.join(" ")}>
            <Paragraph>バリエーション：</Paragraph>
            <Select options={options} isList id={"variation"} />
            <Paragraph>備考：</Paragraph>
            <Input value={""} id={""} width50Per />
          </div>
        </div>
        <div className={commonClasses.ml_auto}>
          <Paragraph isBold>小計：1000(CNY)</Paragraph>
        </div>
      </div>
      <CloseButton clickFunction={() => {
      }}
      />
    </WhiteWideWrapper>
  );
};

export default OrderCartItem;
