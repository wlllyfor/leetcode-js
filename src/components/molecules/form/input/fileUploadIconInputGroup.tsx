"use client";

import { ReactElement } from "react";
import InputFileUploadIcon from "@/components/molecules/form/input/inputFileUploadIcon";
import InputGroup44 from "@/components/molecules/form/input/inputGroup44";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import { InputFileUploadIconType } from "@/types/components/molecules/form/input/InputFileUploadIconType";
import { FileUploadIconInputGroupType } from "@/types/components/molecules/form/input/FileUploadIconInputGroupType";
import { InputGroupType } from "@/types/components/molecules/form/input/InputGroupType";

const FileUploadIconInputGroup = ({
  inputId,
  inputFileUploadIconId,
  inputValue,
  text,
  name,
  isRequired = false,
  onFocus,
  onBlur,
  onClick,
}: FileUploadIconInputGroupType): ReactElement => {
  const inputGroupProps: InputGroupType = {
    onFocus: onFocus,
    onBlur: onBlur,
    onClick: onClick,
    id: inputId,
    value: inputValue,
    isRequired: isRequired,
    isDisabled: false,
    isAutocomplete: false,
    isReadOnly: false,
    text: text,
  };

  const inputFileUploadIconProps: InputFileUploadIconType = {
    id: inputFileUploadIconId,
    isRequired: false,
    value: text,
    name: name,
  };
  return (
    <>
      <FlexWrapper>
        <InputGroup44 {...inputGroupProps} />
        <InputFileUploadIcon {...inputFileUploadIconProps} />
      </FlexWrapper>
    </>
  );
};

export default FileUploadIconInputGroup;
