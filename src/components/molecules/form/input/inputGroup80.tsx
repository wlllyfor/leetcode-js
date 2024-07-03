"use client";

import { ReactElement } from "react";
import Input from "@/components/atoms/form/input";
import Label from "@/components/atoms/form/label";
import InputWrapper80 from "@/components/atoms/div/wrapper/inputWrapper80";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { InputType } from "@/types/components/atoms/form/InputType";
import { InputGroupType } from "@/types/components/molecules/form/input/InputGroupType";

const InputGroup80 = ({
  onFocus,
  onBlur,
  onClick,
  onChange,
  id,
  text,
  name,
  inputType,
  placeholder,
  isRequired = false,
  isDisabled = false,
  maxLength,
  isAutocomplete = false,
  isReadOnly = false,
  value = "",
  type,
}: InputGroupType): ReactElement => {

  const labelProps: LabelType = {
    text: text,
    isRequired: isRequired,
    htmlFor: id,
  };
  const inputProps: InputType = {
    onFocus: onFocus,
    onBlur: onBlur,
    onClick: onClick,
    onChange: onChange,
    type: type,
    id: id,
    value: value,
    name: name,
    inputType: inputType,
    placeholder: placeholder,
    isRequired: isRequired,
    isDisabled: isDisabled,
    maxLength: maxLength,
    isAutocomplete: isAutocomplete,
    isReadOnly: isReadOnly,
  };

  return (
    <InputWrapper80>
      <Label {...labelProps} />
      <Input {...inputProps} />
    </InputWrapper80>
  );
};

export default InputGroup80;
