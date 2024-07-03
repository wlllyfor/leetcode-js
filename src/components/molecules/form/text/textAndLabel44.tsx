"use client";

import { ReactElement } from "react";
import Label from "@/components/atoms/form/label";
import Paragraph from "@/components/atoms/text/paragraph";
import InputWrapper44 from "@/components/atoms/div/wrapper/inputWrapper44";
import FormTextWrapper from "@/components/atoms/div/wrapper/formTextWrapper";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { ParagraphType } from "@/types/components/atoms/text/ParagraphType";
import { TextAndLabelType } from "@/types/components/molecules/form/text/TextAndLabelType";

const TextAndLabel44 = ({ labelText, paragraphText }: TextAndLabelType): ReactElement => {
  const labelProps: LabelType = {
    text: labelText,
  };
  const ParagraphProps: ParagraphType = {
    text: paragraphText,
  };

  return (
    <InputWrapper44>
      <Label {...labelProps} />
      <FormTextWrapper>
        <Paragraph {...ParagraphProps} />
      </FormTextWrapper>
    </InputWrapper44>
  );
};

export default TextAndLabel44;
