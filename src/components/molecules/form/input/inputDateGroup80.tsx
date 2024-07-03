"use client";

import { ReactElement } from "react";
import { InputDate } from "@/components/molecules/form/input/inputDate";
import Label from "@/components/atoms/form/label";
import InputWrapper80 from "@/components/atoms/div/wrapper/inputWrapper80";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { InputDateGroupType } from "@/types/components/molecules/form/input/InputDateGroupType";
import { InputDateType } from "@/types/components/molecules/form/input/InputDateType";

const InputDateGroup80 = ({
  id,
  labelText,
  isRange = false,
  isCalendar = false,
  isRequired = false,
  onChange,
  value,
}: InputDateGroupType): ReactElement => {
  const labelProps: LabelType = {
    text: labelText,
    isRequired: isRequired,
  };

  const inputDateProps: InputDateType = {
    id: id,
    isRange: isRange,
    isCalendar: isCalendar,
    onChange: onChange,
    value: value,
  };

  return (
    <InputWrapper80>
      <Label {...labelProps} />
      <InputDate {...inputDateProps} />
    </InputWrapper80>
  );
};

export default InputDateGroup80;
