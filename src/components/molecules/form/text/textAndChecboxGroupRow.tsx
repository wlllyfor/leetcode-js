"use client";

import { ReactElement } from "react";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import InputCheckbox from "@/components/molecules/form/input/inputCheckbox";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import InputWrapper24 from "@/components/atoms/div/wrapper/inputWrapper24";
import Paragraph from "@/components/atoms/text/paragraph";
import Label from "@/components/atoms/form/label";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { TextAndCheckboxGroupType } from "@/types/components/molecules/form/text/TextAndCheckboxGroupType";

const TextAndChecboxGroupRow = ({ text, options }: TextAndCheckboxGroupType): ReactElement => {
  const labelProps: LabelType = {
    text: text,
  };

  return (
    <>
      <ContentAreaWrapper>
        <Label {...labelProps} />
        <FlexWrapper>
          {options.map((option, index) => (
            <InputWrapper24 key={index}>
              <Paragraph text={option.paragraph} />
              <InputCheckbox id={option.id} checked={option.checked} text="無課金設定" fontSize="8px" />
            </InputWrapper24>
          ))}
        </FlexWrapper>
      </ContentAreaWrapper>
    </>
  );
};

export default TextAndChecboxGroupRow;
