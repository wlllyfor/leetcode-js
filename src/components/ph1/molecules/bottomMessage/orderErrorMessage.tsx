"use client";

import { ReactElement } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Paragraph from "@/components/atoms/paragraph";
import BottomButton from "@/components/atoms/button/bottomButton";
import Link from "next/link";

const OrderErrorMessage = (): ReactElement => {
  return (
    <WhiteWideWrapper>
      <Paragraph isBold isLarge isCenter>
        発注エラー
      </Paragraph>
      <div className={`${commonClasses.inner} ${commonClasses.mt_16}`}>
        <Paragraph isCenter>
          まるまる（通過）の口座残高が不足しております。資金をチャージ後再度実行くださいませ。
        </Paragraph>
      </div>
      <BottomButton color={"green"} text={"チャージ"} />
      <Paragraph isLink isCenter isMarginTop>
        <Link href={""}>マイページへ戻る</Link>
      </Paragraph>
    </WhiteWideWrapper>
  );
};

export default OrderErrorMessage;
