"use client";

import { ReactElement } from "react";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import ButtonAreaWrapper from "@/components/atoms/div/wrapper/buttonAreaWrapper";
import NormalClickableButton from "@/components/atoms/button/normalClickableButton";
import { ButtonGroupType } from "@/types/components/molecules/buttonGroup/employee/bankAccounts/ButtonGroupType";

const ButtonGroup = ({
  handlePaymentsButtonClick,
  handleAccountItemButtonClick,
  handleProfitButtonClick,
  handleSuppliersButtonClick,
}: ButtonGroupType): ReactElement => {
  return (
    <ButtonAreaWrapper>
      <FlexWrapper>
        <NormalClickableButton color="lightblue" text={"口座追加"} onClick={handlePaymentsButtonClick} />
        <NormalClickableButton color="lightblue" text={"科目追加"} onClick={handleAccountItemButtonClick} />
        <NormalClickableButton color="lightblue" text={"売上科目追加"} onClick={handleProfitButtonClick} />
        <NormalClickableButton color="lightblue" text={"取引先追加"} onClick={handleSuppliersButtonClick} />
      </FlexWrapper>
    </ButtonAreaWrapper>
  );
};

export default ButtonGroup;
