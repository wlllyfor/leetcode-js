"use client";

import { ReactElement } from "react";
import Input from "@/components/atoms/form/input";
import InputCheckbox from "@/components/molecules/form/input/inputCheckbox";
import Label from "@/components/atoms/form/label";
import InputWrapper80 from "@/components/atoms/div/wrapper/inputWrapper80";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { InputType } from "@/types/components/atoms/form/InputType";
import { InputCheckboxType } from "@/types/components/molecules/form/input/InputCheckboxType";
import { InputCheckboxGroupType } from "@/types/components/molecules/form/input/InputCheckboxGroupType";

const InputCheckboxGroup80 = ({
  onFocus,
  onBlur,
  onClick,
  onChange,
  id,
  text,
  name,
  placeholder,
  isRequired = false,
  isDisabled = false,
  maxLength,
  isAutocomplete = false,
  isReadOnly = false,
  value = "",
  checkboxId,
  checkboxLabelText,
  checked,
  changeFunction,
}: InputCheckboxGroupType): ReactElement => {

  const labelProps: LabelType = {
    text: text,
    isRequired: isRequired,
    htmlFor: id,
  };
  const InputCheckboxProps: InputCheckboxType = {
    id: checkboxId,
    text: checkboxLabelText,
    checked: checked,
    changeFunction: changeFunction,
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
    <InputWrapper80>
      <div className="flex items-center gap-2">
        <Label {...labelProps} />
        <InputCheckbox {...InputCheckboxProps} />
      </div>
      <Input {...inputProps} />
    </InputWrapper80>
  );
};

export default InputCheckboxGroup80;
