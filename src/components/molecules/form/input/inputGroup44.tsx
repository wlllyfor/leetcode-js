"use client";

import { ReactElement } from "react";
import Input from "@/components/atoms/form/input";
import Label from "@/components/atoms/form/label";
import InputWrapper44 from "@/components/atoms/div/wrapper/inputWrapper44";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { InputGroupType } from "@/types/components/molecules/form/input/InputGroupType";
import { InputType } from "@/types/components/atoms/form/InputType";

const InputGroup44 = ({
  onFocus,
  onBlur,
  onClick,
  id,
  text,
  name,
  value,
  placeholder,
  isRequired = false,
  isDisabled = false,
  maxLength,
  isAutocomplete = false,
  isReadOnly = false,
  onChange,
}: InputGroupType): ReactElement => {

  const labelProps: LabelType = {
    text: text,
    isRequired: isRequired,
  };
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
    <InputWrapper44>
      <Label {...labelProps} />
      <Input {...inputProps} />
    </InputWrapper44>
  );
};

export default InputGroup44;
