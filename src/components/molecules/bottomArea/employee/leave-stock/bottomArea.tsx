"use client";

import { ReactElement } from "react";
import BottomAreaWrapper from "@/components/atoms/div/wrapper/bottomAreaWrapper";
import BottomButton from "@/components/atoms/button/bottomButton";

const BottomArea = ({ handleOnClickOpenLeaveModal }: { handleOnClickOpenLeaveModal: () => void; }): ReactElement => {
  return (
    <BottomAreaWrapper>
      <BottomButton text={"出庫処理"} color={"lightBlue"} clickFunction={handleOnClickOpenLeaveModal} />
    </BottomAreaWrapper>
  );
};

export default BottomArea;
