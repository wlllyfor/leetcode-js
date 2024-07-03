"use client";

import { ReactElement } from "react";
import InputFileUploadIcon from "@/components/molecules/form/input/inputFileUploadIcon";
import TextareaGroup44 from "@/components/molecules/form/textarea/textareaGroup44";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import { TextareaGroupType } from "@/types/components/molecules/form/textarea/TextareaGroupType";
import { InputFileUploadIconType } from "@/types/components/molecules/form/input/InputFileUploadIconType";
import { FileTextareaGroupType } from "@/types/components/molecules/form/textarea/FileUploadIconTextareaGroupType";

const FileUploadIconTextareaGroup = ({
  onFocus,
  onBlur,
  onClick,
  textareaId,
  inputFileUploadIconId,
  labelText,
  name,
  placeholder,
  isRequired = false,
  rows = 3,
  height,
  value,
  onChange,
  handleFileOnChange,
}: FileTextareaGroupType): ReactElement => {

  const textareaGroup44Props: TextareaGroupType = {
    onFocus: onFocus,
    onBlur: onBlur,
    onClick: onClick,
    id: textareaId,
    labelText: labelText,
    name: name,
    placeholder: placeholder,
    isRequired: isRequired,
    isDisabled: false,
    isReadOnly: false,
    rows: rows,
    height: height,
    onChange: onChange,
    value: value,
  };

  const inputFileUploadIconProps: InputFileUploadIconType = {
    id: inputFileUploadIconId,
    isRequired: false,
    value: "",
    name: name,
    handleOnChange: handleFileOnChange,
  };
  return (
    <>
      <FlexWrapper>
        <TextareaGroup44 {...textareaGroup44Props} />
        <InputFileUploadIcon {...inputFileUploadIconProps} />
      </FlexWrapper>
    </>
  );
};

export default FileUploadIconTextareaGroup;
