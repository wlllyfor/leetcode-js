import React, { ReactElement, useEffect, useState } from "react";
import CheckboxInput from "@/components/atoms/form/checkboxInput";
import { CheckboxInputType } from "@/types/components/atoms/form/CheckboxInputType";
import { TableDataCheckboxType } from "@/types/components/atoms/table/TableDataCheckbox";

const TableHeadCheckbox = ({
  id,
  checked: initialChecked,
  changeFunction,
  width,
  minWidth,
}: TableDataCheckboxType): ReactElement => {
  const classNames = `px-3.5 py-1 whitespace-nowrap text-xs text-gray-800 bg-[#F9FAFB] ${width} ${minWidth}`;
  const [ checked, setChecked ] = useState<boolean>(initialChecked ?? false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const CheckboxInputProps: CheckboxInputType = {
    id: id,
    checked: checked,
    // onClick: handleCheckboxChange,
    onChange: handleCheckboxChange,
  };

  useEffect(() => {
    setChecked(initialChecked ?? false);
  }, [ initialChecked ]);

  useEffect(() => {
    changeFunction && changeFunction(checked);
  }, [ checked, changeFunction ]);

  return (
    <th className={classNames}>
      <CheckboxInput {...CheckboxInputProps} />
    </th>
  );
};

export default TableHeadCheckbox;
