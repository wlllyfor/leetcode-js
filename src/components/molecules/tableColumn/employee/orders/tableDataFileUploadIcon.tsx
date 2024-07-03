"use client";

import React, { ReactElement } from "react";
import FileUploadIconTextareaGroup from "@/components/molecules/form/textarea/fileUploadIconTextareaGroup";
import {
  TableDataFileUploadIconType,
} from "@/types/components/molecules/tableColumn/employee/orders/TableDataFileUploadIconType";
import { FileTextareaGroupType } from "@/types/components/molecules/form/textarea/FileUploadIconTextareaGroupType";


const TableDataFileUploadIcon = ({
  textareaId,
  inputFileUploadIconId,
  labelText,
  name,
  placeholder,
  isRequired = false,
  rows = 3,
  height,
  width,
  onChange,
  value,
}: TableDataFileUploadIconType): ReactElement => {

  const classNames = `
    px-3 py-3 whitespace-nowrap text-xs text-gray-800
    border-solid border-[#D4CECE] border align-middle ${width}
  `;

  const fileUploadIconTextareaGroupProps: FileTextareaGroupType = {
    textareaId: textareaId,
    inputFileUploadIconId: inputFileUploadIconId,
    labelText: labelText,
    name: name,
    placeholder: placeholder,
    isRequired: isRequired,
    rows: rows,
    height: height,
    value: value,
    onChange: onChange,
  };

  return (
    <td className={classNames}>
      <div className="mt-2 w-fit">
        <FileUploadIconTextareaGroup {...fileUploadIconTextareaGroupProps} />
      </div>
    </td>
  );
};

export default TableDataFileUploadIcon;
