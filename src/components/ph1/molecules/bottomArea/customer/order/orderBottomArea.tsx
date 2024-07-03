"use client";

import { Dispatch, ReactElement, SetStateAction } from "react";
import BottomAreaWrapper from "@/components/atoms/div/wrapper/bottomAreaWrapper";
import BottomButton from "@/components/atoms/button/bottomButton";
import Paragraph from "@/components/atoms/paragraph";
import commonClasses from "@/styles/common/page.module.scss";

const OrderBottomArea = ({
  setIsCancelModalOpen,
  setIsReorderModalOpen,
  checkedCount,
}: {
  setIsCancelModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsReorderModalOpen: Dispatch<SetStateAction<boolean>>;
  checkedCount: number;
}): ReactElement => {
  return (
    <BottomAreaWrapper>
      <div className={commonClasses.mr_16}>
        <Paragraph isBold>{checkedCount}件 選択中</Paragraph>
      </div>
      <BottomButton
        text={"キャンセル依頼"}
        color={"red"}
        clickFunction={() => setIsCancelModalOpen(prevState => true)}
      />
      <BottomButton
        text={"再注文依頼"}
        color={"dark"}
        clickFunction={() => setIsReorderModalOpen(prevState => true)}
      />
    </BottomAreaWrapper>
  );
};

export default OrderBottomArea;
