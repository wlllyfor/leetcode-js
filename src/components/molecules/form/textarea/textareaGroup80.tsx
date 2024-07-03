"use client";

import { ReactElement } from "react";
import Textarea from "@/components/atoms/form/textarea";
import Label from "@/components/atoms/form/label";
import InputWrapper80 from "@/components/atoms/div/wrapper/inputWrapper80";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { TextareaGroupType } from "@/types/components/molecules/form/textarea/TextareaGroupType";
import { TextareaType } from "@/types/components/atoms/form/TextareaType";

const TextareaGroup80 = ({
  onFocus,
  onBlur,
  onClick,
  onChange,
  id,
  name,
  placeholder,
  labelText,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  rows = 1,
  value = "",
}: TextareaGroupType): ReactElement => {
  const labelProps: LabelType = {
    text: labelText,
    isRequired: isRequired || false,
  };

  const textareaProps: TextareaType = {
    onFocus: onFocus,
    onBlur: onBlur,
    onClick: onClick,
    onChange: onChange,
    id: id,
    value: value,
    name: name,
    placeholder: placeholder,
    isRequired: isRequired || false,
    isDisabled: isDisabled || false,
    isReadOnly: isReadOnly || false,
    rows: rows,
  };

  return (
    <InputWrapper80>
      <Label {...labelProps} />
      <Textarea {...textareaProps} />
    </InputWrapper80>
  );
};

export default TextareaGroup80;
