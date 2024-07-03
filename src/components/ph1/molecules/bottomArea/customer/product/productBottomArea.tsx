"use client";

import { ReactElement } from "react";
import BottomAreaWrapper from "@/components/atoms/div/wrapper/bottomAreaWrapper";
import BottomButton from "@/components/atoms/button/bottomButton";
import Paragraph from "@/components/atoms/paragraph";
import commonClasses from "@/styles/common/page.module.scss";
import { getCustomerFrontUrl, routes } from "@/routes";
import { useRouter } from "next/navigation";

const ProductBottomArea = ({ hubCode, checkedIdList }: { hubCode: string; checkedIdList: number[]; }): ReactElement => {
  const router = useRouter();

  /**
   * 入荷依頼ボタン押下イベント
   */
  const handleOnClickReceiveRequestButton = (): void => {
    const redirectPath: string = getCustomerFrontUrl(hubCode ?? "", routes.front.customer.receiveStock.url);
    const idList = checkedIdList.join(",");
    router.push(`${redirectPath}?srcProductIdList=${idList}`);
  };

  /**
   * 出荷依頼ボタン押下イベント
   */
  const handleOnClickLeaveRequestButton = (): void => {
    const redirectPath: string = getCustomerFrontUrl(hubCode ?? "", routes.front.customer.leaveStock.url);
    const idList = checkedIdList.join(",");
    router.push(`${redirectPath}?srcProductIdList=${idList}`);
  };

  return (
    <BottomAreaWrapper>
      <div className={commonClasses.mr_16}>
        <Paragraph isBold>{checkedIdList.length}件 選択中</Paragraph>
      </div>
      {checkedIdList?.length > 0 && (
        <BottomButton text={"入荷依頼"} color={"blue"} clickFunction={handleOnClickReceiveRequestButton} />
      )}
      {checkedIdList?.length > 0 && (
        <BottomButton text={"出荷依頼"} color={"blue"} clickFunction={handleOnClickLeaveRequestButton} />
      )}
    </BottomAreaWrapper>
  );
};

export default ProductBottomArea;
