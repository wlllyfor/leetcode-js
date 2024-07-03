"use client";

import { ReactElement } from "react";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import ButtonAreaWrapper from "@/components/atoms/div/wrapper/buttonAreaWrapper";
import NormalClickableButton from "@/components/atoms/button/normalClickableButton";
import { ButtonGroupType } from "@/types/components/molecules/buttonGroup/employee/receive/ButtonGroupType";

const ButtonGroup = ({ handleInspectionButtonClick, handleReceiveButtonClick }: ButtonGroupType): ReactElement => {
  return (
    <ButtonAreaWrapper>
      <FlexWrapper>
        <NormalClickableButton color="lightblue" text={"入荷検品"} onClick={handleInspectionButtonClick} />
        <NormalClickableButton color="lightblue" text={"入庫処理"} onClick={handleReceiveButtonClick} />
      </FlexWrapper>
    </ButtonAreaWrapper>
  );
};

export default ButtonGroup;
