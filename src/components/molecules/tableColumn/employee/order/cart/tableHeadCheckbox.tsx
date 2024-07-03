import React, { ReactElement } from "react";
import CheckboxInput from "@/components/atoms/form/checkboxInput";
import { CheckboxInputType } from "@/types/components/atoms/form/CheckboxInputType";
import { TableDataCheckboxType } from "@/types/components/atoms/table/TableDataCheckbox";

const TableHeadCheckbox = ({
  id,
  changeFunction,
  width,
  minWidth,
  checked,
}: TableDataCheckboxType): ReactElement => {
  const classNames = `px-3.5 py-1 whitespace-nowrap text-xs text-gray-800 ${width} ${minWidth}`;


  const handleCheckboxChange = () => {
    changeFunction && changeFunction(!checked);
  };

  const CheckboxInputProps: CheckboxInputType = {
    id: id,
    checked: checked ?? false,
    // onClick: handleCheckboxChange,
    onChange: handleCheckboxChange,
  };

  return (
    <th className={classNames}>
      <CheckboxInput {...CheckboxInputProps} />
    </th>
  );
};

export default TableHeadCheckbox;
