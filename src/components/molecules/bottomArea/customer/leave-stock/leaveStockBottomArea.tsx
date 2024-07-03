"use client";

import { Dispatch, ReactElement, SetStateAction } from "react";
import BottomAreaWrapper from "@/components/atoms/div/wrapper/bottomAreaWrapper";
import BottomButton from "@/components/atoms/button/bottomButton";
import Paragraph from "@/components/atoms/paragraph";
import commonClasses from "@/styles/common/page.module.scss";

const LeaveStockBottomArea = ({
  checkedIdList,
  setIsCancelModalOpen,
}: {
  checkedIdList: number[];
  setIsCancelModalOpen: Dispatch<SetStateAction<boolean>>;
}): ReactElement => {
  return (
    <BottomAreaWrapper>
      <div className={commonClasses.mr_16}>
        <Paragraph isBold>{checkedIdList.length}件 選択中</Paragraph>
      </div>
      {checkedIdList.length > 0 && (
        <BottomButton
          text={"キャンセル依頼"}
          color={"red"}
          clickFunction={() => {
            setIsCancelModalOpen(prevState => true);
          }}
        />
      )}
    </BottomAreaWrapper>
  );
};

export default LeaveStockBottomArea;
