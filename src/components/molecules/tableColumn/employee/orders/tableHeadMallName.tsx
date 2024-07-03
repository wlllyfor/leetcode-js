import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import CheckboxInput from "@/components/atoms/form/checkboxInput";
import { CheckboxInputType } from "@/types/components/atoms/form/CheckboxInputType";
import { TableHeadMallNameType } from "@/types/components/molecules/tableColumn/employee/orders/TableHeadMallNameType";

const TableHeadMallName = ({
  id,
  defaultChecked,
  handleCheckboxOnChange,
  width,
  minWidth,
  customerCart,
}: TableHeadMallNameType): ReactElement => {
  const classNames = `
    px-3 py-3 whitespace-nowrap text-xs bg-[#FADE7B]
    align-middle ${width} ${minWidth}
  `;
  const [ mallChecked, setMallChecked ] = useState<boolean>(defaultChecked);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMallChecked(prevState => !prevState);
    handleCheckboxOnChange(e);
  };

  const CheckboxInputProps: CheckboxInputType = {
    id: id,
    checked: mallChecked,
    // onClick: handleCheckboxOnChange,
    onChange: onChange,
  };

  useEffect(() => {
    setMallChecked(defaultChecked);
  }, [ defaultChecked ]);

  // useEffect(() => {
  //   changeFunction && changeFunction(checked);
  // }, [ checked, changeFunction ]);

  return (
    <>
      <tr className="pt-2">
        <th className={classNames}>
          <CheckboxInput {...CheckboxInputProps} />
        </th>
        <th className={classNames} colSpan={10}>
          <span className="bold text-[16px]">{customerCart.mallProduct.mall}</span>
          <span className="text-[14px]"> : {""}</span>
        </th>
      </tr>
    </>
  );
};

export default TableHeadMallName;
