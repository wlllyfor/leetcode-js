"use client";

import { ReactElement } from "react";
import { FileUploadInputType } from "@/types/components/atoms/form/FileUploadInputType";

const FileUploadInput = ({ id, name, isRequired, onChange }: FileUploadInputType): ReactElement => {
  return <input type="file" id={id} name={name} required={isRequired} className="hidden" onChange={onChange} />;
};

export default FileUploadInput;
