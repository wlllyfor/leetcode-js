"use client";

import { ReactElement } from "react";
import Textarea from "@/components/atoms/form/textarea";
import Label from "@/components/atoms/form/label";
import InputWrapper44 from "@/components/atoms/div/wrapper/inputWrapper44";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { TextareaGroupType } from "@/types/components/molecules/form/textarea/TextareaGroupType";
import { TextareaType } from "@/types/components/atoms/form/TextareaType";

const TextareaGroup44 = ({
  onFocus,
  onBlur,
  onClick,
  onChange,
  id,
  name,
  placeholder,
  labelText,
  value,
  isRequired = false,
  isDisabled = false,
  isReadOnly = false,
  rows = 3,
  height,
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
    height: height,
  };

  return (
    <InputWrapper44>
      <Label {...labelProps} />
      <Textarea {...textareaProps} />
    </InputWrapper44>
  );
};

export default TextareaGroup44;
