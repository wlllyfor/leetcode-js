"use client";

import { ReactElement } from "react";
import { FileUploadIconType } from "@/types/components/atoms/form/FileUploadIconType";

const FileUploadIcon = ({ onClick }: FileUploadIconType): ReactElement => {
  return (
    <span className="material-symbols-outlined" onClick={onClick}>
      attach_file
    </span>
  );
};

export default FileUploadIcon;
