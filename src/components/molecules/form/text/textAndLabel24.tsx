"use client";

import { ReactElement } from "react";
import Label from "@/components/atoms/form/label";
import Paragraph from "@/components/atoms/text/paragraph";
import InputWrapper24 from "@/components/atoms/div/wrapper/inputWrapper24";
import FormTextWrapper from "@/components/atoms/div/wrapper/formTextWrapper";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { ParagraphType } from "@/types/components/atoms/text/ParagraphType";
import { TextAndLabelType } from "@/types/components/molecules/form/text/TextAndLabelType";

const TextAndLabel24 = ({ labelText, paragraphText, isRequired }: TextAndLabelType): ReactElement => {
  const labelProps: LabelType = {
    text: labelText,
    isRequired: isRequired || false,
  };
  const ParagraphProps: ParagraphType = {
    text: paragraphText,
  };

  return (
    <InputWrapper24>
      <Label {...labelProps} />
      <FormTextWrapper>
        <Paragraph {...ParagraphProps} />
      </FormTextWrapper>
    </InputWrapper24>
  );
};

export default TextAndLabel24;
