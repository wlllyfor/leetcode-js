import classes from "@/styles/components/molecules/fileUploadButton.module.scss";
import Label from "@/components/atoms/label";
import Img from "@/components/atoms/img";
import FileUpload from "@/components/atoms/fileUpload";
import Icon from "@/resource/img/icon_file_upload.svg";
import { FileUploadType } from "@/types/components/atoms/FileUploadType";
import { LabelType } from "@/types/components/atoms/LabelType";
import { FileUploadButtonType } from "@/types/components/molecules/FileUploadButtonType";
import { ChangeEvent, ReactElement, useState } from "react";
import Paragraph from "@/components/atoms/paragraph";

const FileUploadButton = ({ id, text, name, isMultiple, changeFunction }: FileUploadButtonType): ReactElement => {
  const [ selectedFileName, setSelectedFileName ] = useState<string>("");

  const FileUploadProps: FileUploadType = {
    id: id,
    name: name,
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
    text: text,
  };
  return (
    <div className={classes.inputContent__wrapper}>
      <Label {...labelProps}>
        <Img src={Icon} alt={""} />
      </Label>
      <FileUpload {...FileUploadProps} />
      {selectedFileName && <Paragraph>{selectedFileName}</Paragraph>}
    </div>
  );
};

export default FileUploadButton;
