"use client";

import { ReactElement } from "react";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import ButtonAreaWrapper from "@/components/atoms/div/wrapper/buttonAreaWrapper";
import NormalClickableButton from "@/components/atoms/button/normalClickableButton";
import { ButtonGroupType } from "@/types/components/molecules/buttonGroup/employee/transactions/ButtonGroupType";

const ButtonGroup = ({ handleDepositButtonClick, handleWithdrawalButtonClick }: ButtonGroupType): ReactElement => {
  return (
    <ButtonAreaWrapper>
      <FlexWrapper>
        <NormalClickableButton color="lightblue" text={"顧客入金登録"} onClick={handleDepositButtonClick} />
        <NormalClickableButton color="lightblue" text={"顧客出金登録"} onClick={handleWithdrawalButtonClick} />
      </FlexWrapper>
    </ButtonAreaWrapper>
  );
};

export default ButtonGroup;
