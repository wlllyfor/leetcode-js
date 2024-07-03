"use client";

import { ReactElement } from "react";
import { FileUploadButtonType } from "@/types/components/atoms/form/FileUploadButtonType";

const FileUploadButton = ({ handleChange }: FileUploadButtonType): ReactElement => {
  return (
    <div
      className="bg-[#EAEAEA] w-fit px-1 py-[2px] rounded-sm text-[10px] border border-[#5B5B5B] border-solid"
      onChange={handleChange}
    >
      画像をアップロード
    </div>
  );
};

export default FileUploadButton;
