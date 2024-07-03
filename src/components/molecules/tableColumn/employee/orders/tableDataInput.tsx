"use client";

import React, { ReactElement } from "react";
import Input from "@/components/atoms/form/input";
import InputWrapper44 from "@/components/atoms/div/wrapper/inputWrapper44";
import { TableDataInputType } from "@/types/components/molecules/tableColumn/employee/orders/TableDataInputType";
import { InputType } from "@/types/components/atoms/form/InputType";

const TableDataInput = ({
  onFocus,
  onBlur,
  onClick,
  onChange,
  id,
  name,
  placeholder,
  isRequired = false,
  isDisabled = false,
  maxLength,
  isAutocomplete = false,
  isReadOnly = false,
  width,
  value,
}: TableDataInputType): ReactElement => {

  const classNames = `
    px-3 py-3 whitespace-nowrap text-xs text-gray-800
    border-solid border-[#D4CECE] border align-middle ${width}
  `;

  const inputProps: InputType = {
    onFocus: onFocus,
    onBlur: onBlur,
    onClick: onClick,
    onChange: onChange,
    id: id,
    value: value,
    name: name,
    placeholder: placeholder,
    isRequired: isRequired,
    isDisabled: isDisabled,
    maxLength: maxLength,
    isAutocomplete: isAutocomplete,
    isReadOnly: isReadOnly,
  };

  return (
    <td className={classNames}>
      <div className="mt-2 w-fit">
        <InputWrapper44>
          <Input {...inputProps} />
        </InputWrapper44>
      </div>
    </td>
  );
};

export default TableDataInput;
