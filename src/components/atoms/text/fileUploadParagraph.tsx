"use client";

import { ReactElement } from "react";
import { ParagraphType } from "@/types/components/atoms/text/ParagraphType";

const FileUploadParagraph = ({ text }: ParagraphType): ReactElement => {
  return (
    <p className="text-sm w-full bottom-[-20px] whitespace-nowrap overflow-hidden overflow-ellipsis">{text}</p>
  );
};

export default FileUploadParagraph;
