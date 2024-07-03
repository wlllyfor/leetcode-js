import React, { ReactElement, useEffect, useState } from "react";
import CheckboxInput from "@/components/atoms/form/checkboxInput";
import { CheckboxInputType } from "@/types/components/atoms/form/CheckboxInputType";
import { TableDataCheckboxType } from "@/types/components/atoms/table/TableDataCheckbox";

const TableDataCheckbox = ({
  id,
  checked: initialChecked,
  changeFunction,
  width,
  minWidth,
}: TableDataCheckboxType): ReactElement => {
  const classNames = `
    px-3 py-3 whitespace-nowrap text-xs text-gray-800
    border-solid border-[#D4CECE] border align-middle ${width} ${minWidth}
  `;
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
    <td className={classNames}>
      <CheckboxInput {...CheckboxInputProps} />
    </td>
  );
};

export default TableDataCheckbox;
