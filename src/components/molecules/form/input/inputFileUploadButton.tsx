"use client";

import { ChangeEvent, ReactElement, useState } from "react";
import FileUploadButton from "@/components/atoms/form/fileUploadButton";
import FileUploadInput from "@/components/atoms/form/fileUploadInput";
import Label from "@/components/atoms/form/label";
import FileUploadParagraph from "@/components/atoms/text/fileUploadParagraph";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { FileUploadInputType } from "@/types/components/atoms/form/FileUploadInputType";
import { InputFileUploadButtonType } from "@/types/components/molecules/form/input/InputFileUploadButtonType";

const InputFileUploadButton = ({
  id,
  labelText,
  isRequired = false,
  name,
  changeFunction,
}: InputFileUploadButtonType): ReactElement => {
  const [ fileName, setFileName ] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (changeFunction) {
      changeFunction(e);
    }
    if (e.target.files) {
      setFileName(e.target.files[0].name);
    }
  };

  const LabelProps: LabelType = {
    isRequired: isRequired,
    text: labelText,
    htmlFor: id,
  };

  const FileUploadInputProps: FileUploadInputType = {
    id: id,
    name: name,
    isRequired: isRequired,
    // value: fileName,
    onChange: handleFileChange,
  };

  return (
    <>
      <div>
        <Label {...LabelProps}>
          <FileUploadButton />
        </Label>
        <FileUploadInput {...FileUploadInputProps} />
      </div>
      {fileName && <FileUploadParagraph text={fileName}></FileUploadParagraph>}
    </>
  );
};

export default InputFileUploadButton;
