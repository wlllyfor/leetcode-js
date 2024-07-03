"use client";

import { ReactElement } from "react";
import Label from "@/components/atoms/form/label";
import InputFileUploadIcon from "@/components/molecules/form/input/inputFileUploadIcon";
import Paragraph from "@/components/atoms/text/paragraph";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { ParagraphType } from "@/types/components/atoms/text/ParagraphType";
import { InputFileUploadIconType } from "@/types/components/molecules/form/input/InputFileUploadIconType";
import { FileTextGroupType } from "@/types/components/molecules/form/textarea/FileUploadIconTextGroupType";

const FileUploadIconTextareaGroup = ({
  inputFileUploadIconId,
  labelText,
  paragraphText,
  name,
  isRequired,
}: FileTextGroupType): ReactElement => {
  const labelProps: LabelType = {
    text: labelText,
    isRequired: isRequired || false,
  };
  const ParagraphProps: ParagraphType = {
    text: paragraphText,
  };

  const inputFileUploadIconProps: InputFileUploadIconType = {
    id: inputFileUploadIconId,
    isRequired: false,
    value: "",
    name: name,
  };
  return (
    <>
      <Label {...labelProps} />
      <FlexWrapper>
        <Paragraph {...ParagraphProps} />
        <InputFileUploadIcon {...inputFileUploadIconProps} />
      </FlexWrapper>
    </>
  );
};

export default FileUploadIconTextareaGroup;
