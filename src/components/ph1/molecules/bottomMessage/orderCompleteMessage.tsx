"use client";

import { ReactElement } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Paragraph from "@/components/atoms/paragraph";
import Link from "next/link";
import { getCustomerFrontUrl, routes } from "@/routes";
import BottomButton from "@/components/atoms/button/bottomButton";

const OrderCompleteMessage = ({ hubCode }: { hubCode: string; }): ReactElement => {
  const dashBoardUrl: string = getCustomerFrontUrl(hubCode, routes.front.customer.myPage.url);
  const orderHistoryUrl: string = getCustomerFrontUrl(hubCode ?? "", routes.front.customer.order.history.url);
  return (
    <WhiteWideWrapper>
      <Paragraph isBold isLarge isCenter>
        注文が完了しました
      </Paragraph>
      <div className={`${commonClasses.inner} ${commonClasses.mt_16}`}>
        <Paragraph>
          注文履歴より、処理中の注文IDにつきましてはキャンセル可能です。注文済みのステータスとなりますとキャンセルができませんのでどうかご了承くださいませ。
          ※返品のご対応は可能です。
        </Paragraph>
      </div>
      <BottomButton color={"dark"}>
        <Link href={orderHistoryUrl}>注文履歴</Link>
      </BottomButton>
      <Paragraph isLink isCenter isMarginTop>
        <Link href={dashBoardUrl}>マイページへ戻る</Link>
      </Paragraph>
    </WhiteWideWrapper>
  );
};

export default OrderCompleteMessage;
