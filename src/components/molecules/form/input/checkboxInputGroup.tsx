"use client";

import { ReactElement } from "react";
import InputCheckbox from "@/components/molecules/form/input/inputCheckbox";
import InputGroup44 from "@/components/molecules/form/input/inputGroup44";
import FlexWrapperColumnStart from "@/components/atoms/div/wrapper/flexWrapperColumnStart";
import { InputGroupType } from "@/types/components/molecules/form/input/InputGroupType";
import { InputCheckboxType } from "@/types/components/molecules/form/input/InputCheckboxType";
import { CheckboxInputGroupType } from "@/types/components/molecules/form/input/CheckboxInputGroupType";

const CheckboxInputGroup = ({
  isRequired,
  text,
  id,
  value,
  isDisabled = false,
  isAutocomplete = false,
  isReadOnly = false,
  checkboxLabelText,
  checked,
  fontSize,
}: CheckboxInputGroupType): ReactElement => {
  const InputGroupProps: InputGroupType = {
    id: id,
    value: value,
    isRequired: isRequired,
    isDisabled: isDisabled,
    isAutocomplete: isAutocomplete,
    isReadOnly: isReadOnly,
    text: text,
  };

  const InputCheckboxProps: InputCheckboxType = {
    id: id,
    text: checkboxLabelText,
    checked: checked,
    fontSize: fontSize,
  };

  return (
    <FlexWrapperColumnStart>
      <InputGroup44 {...InputGroupProps} />
      <InputCheckbox {...InputCheckboxProps} />
    </FlexWrapperColumnStart>
  );
};

export default CheckboxInputGroup;
