"use client";

import { ChangeEvent, ReactElement, useState } from "react";
import Input from "@/components/atoms/form/input";
import Label from "@/components/atoms/form/label";
import InputWrapper56 from "@/components/atoms/div/wrapper/inputWrapper56";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { InputType } from "@/types/components/atoms/form/InputType";
import { InputGroupType } from "@/types/components/molecules/form/input/InputGroupType";

const InputGroup56 = ({
  onFocus,
  onBlur,
  onClick,
  id,
  text,
  name,
  placeholder,
  isRequired = false,
  isDisabled = false,
  maxLength,
  isAutocomplete = false,
  isReadOnly = false,
}: InputGroupType): ReactElement => {
  const [ value, setValue ] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const labelProps: LabelType = {
    text: text,
    isRequired: isRequired,
  };
  const inputProps: InputType = {
    onFocus: onFocus,
    onBlur: onBlur,
    onClick: onClick,
    onChange: handleChange,
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
    <InputWrapper56>
      <Label {...labelProps} />
      <Input {...inputProps} />
    </InputWrapper56>
  );
};

export default InputGroup56;
