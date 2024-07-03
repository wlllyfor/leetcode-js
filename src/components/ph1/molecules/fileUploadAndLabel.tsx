import classes from "@/styles/components/molecules/fileUploadAndLabel.module.scss";
import Label from "@/components/atoms/label";
import FileUpload from "@/components/atoms/fileUpload";
import { FileUploadType } from "@/types/components/atoms/FileUploadType";
import { LabelType } from "@/types/components/atoms/LabelType";
import { FileUploadAndLabelType } from "@/types/components/molecules/FileUploadAndLabelType";
import { ChangeEvent, ReactElement, useState } from "react";
import Paragraph from "@/components/atoms/paragraph";

const FileUploadAndLabel = ({
  id,
  buttonText,
  labelText,
  isMultiple,
  changeFunction,
  isRequired,
}: FileUploadAndLabelType): ReactElement => {
  const [ selectedFileName, setSelectedFileName ] = useState<string>("");

  const FileUploadProps: FileUploadType = {
    id: id,
    isMultiple: isMultiple,
    changeFunction: (e: ChangeEvent<HTMLInputElement>) => {
      if (changeFunction) {
        changeFunction(e);
      }
      if (e.target.files) {
        setSelectedFileName(e.target.files[0].name);
      }
    },
  };
  const labelProps: LabelType = {
    htmlFor: id,
    text: buttonText,
  };

  return (
    <div className={classes.inputContent__wrapper}>
      {labelText && <Label text={labelText} isRequired={isRequired} />}
      <Label {...labelProps} isButton />
      <FileUpload {...FileUploadProps} />
      {selectedFileName && <Paragraph>{selectedFileName}</Paragraph>}
    </div>
  );
};

export default FileUploadAndLabel;
