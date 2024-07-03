"use client";

import { ReactElement, useId } from "react";
import FlexWrapperLg from "@/components/atoms/div/wrapper/flexWrapperLg";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import NormalClickableButton from "@/components/atoms/button/normalClickableButton";
import InputGroup44Row from "@/components/molecules/form/input/inputGroup44Row";

const ModalItemFirstRow = (): ReactElement => {
  const inputId = useId();
  return (
    <ContentAreaWrapper>
      <FlexWrapperLg>
        <NormalClickableButton
          text={"明細追加"} color={"lightblue"} onClick={() => {
          }}
        />
        <InputGroup44Row id={`${inputId}-accrual-date`} text={"発生日："} value={""} />
      </FlexWrapperLg>
    </ContentAreaWrapper>
  );
};

export default ModalItemFirstRow;
