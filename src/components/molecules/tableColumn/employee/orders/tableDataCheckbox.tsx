import React, { ReactElement } from "react";
import CheckboxInput from "@/components/atoms/form/checkboxInput";
import { CheckboxInputType } from "@/types/components/atoms/form/CheckboxInputType";
import { TableDataCheckboxType } from "@/types/components/atoms/table/TableDataCheckbox";

const TableDataCheckbox = ({
  id,
  checked,
  width,
  minWidth,
  onChange,
}: TableDataCheckboxType): ReactElement => {
  const classNames = `
    px-3 py-3 whitespace-nowrap text-xs text-gray-800
    border-solid border-[#D4CECE] border align-middle ${width} ${minWidth}
  `;

  const CheckboxInputProps: CheckboxInputType = {
    id: id,
    checked: checked ?? false,
    onChange: onChange,
  };

  return (
    <td className={classNames}>
      <CheckboxInput {...CheckboxInputProps} />
    </td>
  );
};

export default TableDataCheckbox;
