"use client";

import { ReactElement } from "react";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import ButtonAreaWrapper from "@/components/atoms/div/wrapper/buttonAreaWrapper";
import NormalClickableButton from "@/components/atoms/button/normalClickableButton";
import { ButtonGroupType } from "@/types/components/molecules/buttonGroup/customer/receiveStocks/ButtonGroupType";

const ButtonGroup = ({
  handleAddButtonClick,
}: ButtonGroupType): ReactElement => {
  return (
    <ButtonAreaWrapper>
      <FlexWrapper>
        <NormalClickableButton color="purple" text={"CSVテンプレート"} onClick={() => {}} />
        <NormalClickableButton color="purple" text={"CSVアップロード"} onClick={() => {}} />
        <NormalClickableButton color="lightblue" text={"＋追加"} onClick={handleAddButtonClick} />
      </FlexWrapper>
    </ButtonAreaWrapper>
  );
};

export default ButtonGroup;
