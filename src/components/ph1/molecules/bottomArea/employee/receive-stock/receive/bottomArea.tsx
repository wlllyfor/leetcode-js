"use client";

import { ReactElement } from "react";
import BottomAreaWrapper from "@/components/atoms/div/wrapper/bottomAreaWrapper";
import BottomButton from "@/components/atoms/button/bottomButton";

const BottomArea = ({
  handleOnClickOpenInspectModal,
  handleOnClickOpenReceiveModal,
}: {
  handleOnClickOpenInspectModal: () => void;
  handleOnClickOpenReceiveModal: () => void;
}): ReactElement => {
  return (
    <BottomAreaWrapper>
      <BottomButton text={"入荷検品"} color={"lightBlue"} clickFunction={handleOnClickOpenInspectModal} />
      <BottomButton text={"入庫"} color={"lightBlue"} clickFunction={handleOnClickOpenReceiveModal} />
    </BottomAreaWrapper>
  );
};

export default BottomArea;
