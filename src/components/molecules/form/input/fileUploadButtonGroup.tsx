"use client";

import { ChangeEvent, ReactElement } from "react";
import { FileUploadButtonGroupType } from "@/types/components/molecules/form/input/FileUploadButtonGroupType";
import Label from "@/components/atoms/form/label";
import InputFileUploadButton from "@/components/molecules/form/input/inputFileUploadButton";
import { InputFileUploadButtonType } from "@/types/components/molecules/form/input/InputFileUploadButtonType";

const FileUploadButtonGroup = ({
  inputFileUploadButtonId,
  buttonText,
  name,
  labelText,
  changeFunction,
}: FileUploadButtonGroupType): ReactElement => {
  const inputFileUploadButtonProps: InputFileUploadButtonType = {
    id: inputFileUploadButtonId,
    isRequired: false,
    labelText: buttonText,
    name: name,
    changeFunction: (e: ChangeEvent<HTMLInputElement>) => {
      if (changeFunction) {
        changeFunction(e);
      }
    },
  };
  return (
    <>
      <Label text={labelText} />
      <InputFileUploadButton {...inputFileUploadButtonProps} />
    </>
  );
};

export default FileUploadButtonGroup;
