"use client";

import { ReactElement, useState } from "react";
import FileUploadIcon from "@/components/atoms/form/fileUploadIcon";
import FileUploadInput from "@/components/atoms/form/fileUploadInput";
import Label from "@/components/atoms/form/label";
import FileUploadParagraph from "@/components/atoms/text/fileUploadParagraph";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { FileUploadInputType } from "@/types/components/atoms/form/FileUploadInputType";
import { InputFileUploadIconType } from "@/types/components/molecules/form/input/InputFileUploadIconType";

const InputFileUploadIcon = ({
  id,
  value,
  isRequired = false,
  name,
  handleOnChange,
}: InputFileUploadIconType): ReactElement => {
  const [ fileName, setFileName ] = useState<string>("");

  const labelType: LabelType = {
    isRequired: isRequired,
    text: value,
    htmlFor: id,
  };

  const fileUploadInputType: FileUploadInputType = {
    id: id,
    name: name,
    isRequired: isRequired,
    onChange: (e => {
      if (e.target.files) {
        const file = e.target.files[0];
        setFileName(prevState => file.name);
      } else {
        setFileName(prevState => "");
      }

      handleOnChange && handleOnChange(e);
    }),
  };

  return (
    <>
      <div>
        <Label {...labelType}>
          <FileUploadIcon />
        </Label>
        <FileUploadInput {...fileUploadInputType} />
      </div>
      {fileName && <FileUploadParagraph text={fileName} />}
    </>
  );
};

export default InputFileUploadIcon;
