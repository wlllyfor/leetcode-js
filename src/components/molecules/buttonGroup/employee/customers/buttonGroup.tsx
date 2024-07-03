"use client";

import { ReactElement } from "react";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import ButtonAreaWrapper from "@/components/atoms/div/wrapper/buttonAreaWrapper";
import NormalClickableButton from "@/components/atoms/button/normalClickableButton";

const ButtonGroup = (): ReactElement => {
  return (
    <ButtonAreaWrapper>
      <FlexWrapper>
        {/* Todo: モックアップのためonClickにalertを一旦設置。API組み込み時にCSVダウンロードの動作を行う。 */}
        <NormalClickableButton
          color="lightblue" text={"csvダウンロード"}
          onClick={() => alert("csvダウンロードを行います")}
        />
      </FlexWrapper>
    </ButtonAreaWrapper>
  );
};

export default ButtonGroup;
