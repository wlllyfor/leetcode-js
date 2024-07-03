"use client";

import { ReactElement } from "react";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import ButtonAreaWrapper from "@/components/atoms/div/wrapper/buttonAreaWrapper";
import NormalClickableButton from "@/components/atoms/button/normalClickableButton";
import { ButtonGroupType } from "@/types/components/molecules/buttonGroup/employee/employees/ButtonGroupType";

const ButtonGroup = ({
  handleModalButtonClick,
}: ButtonGroupType): ReactElement => {
  return (
    <ButtonAreaWrapper>
      <FlexWrapper>
        <NormalClickableButton
          color="lightblue"
          text={"拠点追加"}
          onClick={handleModalButtonClick}
        />
      </FlexWrapper>
    </ButtonAreaWrapper>
  );
};

export default ButtonGroup;
