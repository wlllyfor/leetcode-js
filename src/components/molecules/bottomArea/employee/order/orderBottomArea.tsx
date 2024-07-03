"use client";

import { Dispatch, ReactElement, SetStateAction } from "react";
import BottomAreaWrapper from "@/components/atoms/div/wrapper/bottomAreaWrapper";
import BottomButton from "@/components/atoms/button/bottomButton";
import Paragraph from "@/components/atoms/paragraph";
import commonClasses from "@/styles/common/page.module.scss";

const OrderBottomArea = ({
  checkedCount,
  setIsBulkEditModalOpen,
  setIsCancelModalOpen,
}: {
  checkedCount: number;
  setIsBulkEditModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsCancelModalOpen: Dispatch<SetStateAction<boolean>>;
}): ReactElement => {
  return (
    <BottomAreaWrapper>
      <div className={commonClasses.mr_16}>
        <Paragraph isBold>{checkedCount}件 選択中</Paragraph>
      </div>
      {checkedCount > 0 && (
        <>
          <BottomButton
            text={"一括編集"}
            color={"yellow"}
            clickFunction={() => {
              setIsBulkEditModalOpen(prevState => true);
            }}
          />
          <BottomButton
            text={"キャンセル"}
            color={"red"}
            clickFunction={() => {
              setIsCancelModalOpen(prevState => true);
            }}
          />
        </>
      )}
    </BottomAreaWrapper>
  );
};

export default OrderBottomArea;
