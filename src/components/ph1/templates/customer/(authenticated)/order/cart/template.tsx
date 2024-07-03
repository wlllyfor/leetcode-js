"use client";

import { ReactElement } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import H2 from "@/components/atoms/h2";
import Paragraph from "@/components/atoms/paragraph";
import OrderCartItem from "@/components/molecules/listItem/customer/order/orderCartItem";
import OrderConfirmMessage from "@/components/molecules/bottomMessage/orderConfirmMessage";
import OrderErrorMessage from "@/components/molecules/bottomMessage/orderErrorMessage";
import OrderCompleteMessage from "@/components/molecules/bottomMessage/orderCompleteMessage";
import AuthenticatedLayout from "@/components/molecules/layouts/customer/authenticatedLayout";
import useAuth from "@/hooks/customer/useAuth";
import Loading from "@/components/molecules/common/loading";

const Template = ({ hubCode }: { hubCode: string; }): ReactElement => {
  const customer = useAuth();

  const dummy = async (): Promise<void> => {};
  if (!customer || !hubCode) {
    return <Loading />;
  }
  return (
    <AuthenticatedLayout hubCode={hubCode}>
      {/* 【PH2】 */}
      <H2 isPageTop>カート注文依頼【PH2】</H2>
      <OrderCartItem id={""}></OrderCartItem>
      <OrderCartItem id={""}></OrderCartItem>
      <OrderCartItem id={""}></OrderCartItem>
      <div className={`${commonClasses.mt_16} ${commonClasses.inner}`}>
        <div className={commonClasses.mt_8}>
          <Paragraph>商品数合計：</Paragraph>
        </div>
        <div className={commonClasses.mt_8}>
          <Paragraph>商品代金合計(概算)：</Paragraph>
        </div>
        <div className={commonClasses.mt_8}>
          <Paragraph>商品代金合計(概算)：</Paragraph>
        </div>
        <div className={commonClasses.mt_8}>
          <Paragraph>その他費用： 0元(CNY)：</Paragraph>
        </div>
        <div className={commonClasses.mt_8}>
          <Paragraph isBold isLarge>
            合計金額（概算）: 1800元(CNY)：
          </Paragraph>
        </div>
      </div>
      <OrderConfirmMessage
        postOrder={async (): Promise<void> => {
          await dummy();
        }}
        isSubmittable={true}
      />
      <OrderErrorMessage />
      <OrderCompleteMessage hubCode={hubCode} />
    </AuthenticatedLayout>
  );
};

export default Template;
