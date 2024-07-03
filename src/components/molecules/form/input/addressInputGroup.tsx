"use client";

import { ChangeEvent, ReactElement, useState } from "react";
import Input from "@/components/atoms/form/input";
import InputWrapperFull from "@/components/atoms/div/wrapper/inputWrapperFull";
import { InputType } from "@/types/components/atoms/form/InputType";
import { InputGroupType } from "@/types/components/molecules/form/input/InputGroupType";

const AddressInputGroup = ({
  onFocus,
  onBlur,
  onClick,
  id,
  name,
  placeholder,
  isRequired = false,
  isDisabled = false,
  maxLength,
  isAutocomplete = false,
  isReadOnly = false,
}: InputGroupType): ReactElement => {
  const [ value, setValue ] = useState<string>(""); // isReadOnlyがtrueの場合、初期値を使用

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const inputProps: InputType = {
    onFocus: onFocus,
    onBlur: onBlur,
    onClick: onClick,
    onChange: handleChange,
    id: id,
    value: value, // valueを直接使用
    name: name,
    placeholder: placeholder,
    isRequired: isRequired,
    isDisabled: isDisabled,
    maxLength: maxLength,
    isAutocomplete: isAutocomplete,
    isReadOnly: isReadOnly,
  };

  return (
    <InputWrapperFull>
      <Input {...inputProps} />
    </InputWrapperFull>
  );
};

export default AddressInputGroup;
