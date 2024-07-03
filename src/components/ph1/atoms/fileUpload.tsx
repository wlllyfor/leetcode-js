"use client";

import { FileUploadType } from "@/types/components/atoms/FileUploadType";
import { ReactElement } from "react";

const FileUpload = ({ name, id, isMultiple, className, changeFunction }: FileUploadType): ReactElement => {
  return (
    <input type="file" name={name} id={id} multiple={isMultiple} className={className} onChange={changeFunction} />
  );
};

export default FileUpload;
