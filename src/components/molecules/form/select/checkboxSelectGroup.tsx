"use client";

import { ReactElement } from "react";
import InputCheckbox from "@/components/molecules/form/input/inputCheckbox";
import FlexWrapperColumnStart from "@/components/atoms/div/wrapper/flexWrapperColumnStart";
import SelectGroup44 from "@/components/molecules/form/select/selectGroup44";
import { SelectGroupType } from "@/types/components/molecules/form/select/SelectGroupType";
import { InputCheckboxType } from "@/types/components/molecules/form/input/InputCheckboxType";
import { CheckboxSelectGroupType } from "@/types/components/molecules/form/select/CheckboxSelectGroupType";

const CheckboxSelectGroup = ({
  isRequired,
  text,
  id,
  checkboxLabelText,
  checked,
  options,
  isMulti,
}: CheckboxSelectGroupType): ReactElement => {
  const SelectGroup44Props: SelectGroupType = {
    isRequired: isRequired,
    text: text,
    isMulti: isMulti,
    options: options,
  };

  const InputCheckboxProps: InputCheckboxType = {
    id: id,
    text: checkboxLabelText,
    checked: checked,
  };

  return (
    <FlexWrapperColumnStart>
      <SelectGroup44 {...SelectGroup44Props} />
      <InputCheckbox {...InputCheckboxProps} />
    </FlexWrapperColumnStart>
  );
};

export default CheckboxSelectGroup;
