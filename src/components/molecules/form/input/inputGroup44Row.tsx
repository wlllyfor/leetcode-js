"use client";

import { ChangeEvent, ReactElement, useState } from "react";
import Input from "@/components/atoms/form/input";
import LabelRow from "@/components/atoms/form/labelRow";
import InputWrapper44 from "@/components/atoms/div/wrapper/inputWrapper44";
import FlexWrapperInput from "@/components/atoms/div/wrapper/flexWrapperInput";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { InputGroupType } from "@/types/components/molecules/form/input/InputGroupType";
import { InputType } from "@/types/components/atoms/form/InputType";

const InputGroup44Row = ({
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
    <FlexWrapperInput>
      <LabelRow {...labelProps} />
      <InputWrapper44>
        <Input {...inputProps} />
      </InputWrapper44>
    </FlexWrapperInput>
  );
};

export default InputGroup44Row;
