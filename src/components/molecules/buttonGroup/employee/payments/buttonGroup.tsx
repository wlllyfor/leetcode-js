"use client";

import { ReactElement } from "react";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import ButtonAreaWrapper from "@/components/atoms/div/wrapper/buttonAreaWrapper";
import NormalClickableButton from "@/components/atoms/button/normalClickableButton";
import { ButtonGroupType } from "@/types/components/molecules/buttonGroup/employee/payments/ButtonGroupType";

const ButtonGroup = ({ handleDepositButtonClick, handleWithdrawalButtonClick }: ButtonGroupType): ReactElement => {
  return (
    <ButtonAreaWrapper>
      <FlexWrapper>
        <NormalClickableButton color="lightblue" text={"入金明細追加"} onClick={handleDepositButtonClick} />
        <NormalClickableButton color="lightblue" text={"出金明細追加"} onClick={handleWithdrawalButtonClick} />
      </FlexWrapper>
    </ButtonAreaWrapper>
  );
};

export default ButtonGroup;
