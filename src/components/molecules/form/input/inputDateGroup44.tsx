"use client";

import { ReactElement } from "react";
import { InputDate } from "@/components/molecules/form/input/inputDate";
import Label from "@/components/atoms/form/label";
import InputWrapper44 from "@/components/atoms/div/wrapper/inputWrapper44";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { InputDateGroupType } from "@/types/components/molecules/form/input/InputDateGroupType";
import { InputDateType } from "@/types/components/molecules/form/input/InputDateType";

const InputDateGroup44 = ({
  id,
  labelText,
  isRange = false,
  isCalendar = false,
  isRequired = false,
}: InputDateGroupType): ReactElement => {
  const labelProps: LabelType = {
    text: labelText,
    isRequired: isRequired,
  };

  const inputDateProps: InputDateType = {
    id: id,
    isRange: isRange,
    isCalendar: isCalendar,
  };

  return (
    <InputWrapper44>
      <Label {...labelProps} />
      <InputDate {...inputDateProps} />
    </InputWrapper44>
  );
};

export default InputDateGroup44;
