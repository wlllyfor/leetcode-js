"use client";

import { ReactElement } from "react";
import Select from "@/components/atoms/form/select";
import Label from "@/components/atoms/form/label";
import InputWrapper44 from "@/components/atoms/div/wrapper/inputWrapper44";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { SelectGroupType } from "@/types/components/molecules/form/select/SelectGroupType";

const SelectGroup44 = ({
  text,
  isRequired,
  isMulti = false,
  options,
  value,
  changeFunction,
  changeMultiItemFunction,
}: SelectGroupType): ReactElement => {
  const labelProps: LabelType = {
    text: text,
    isRequired: isRequired || false,
  };

  return (
    <InputWrapper44>
      <Label {...labelProps} />
      <Select
        options={options} isMulti={isMulti} value={value} changeFunction={changeFunction}
        changeMultiItemFunction={changeMultiItemFunction}
      />
    </InputWrapper44>
  );
};

export default SelectGroup44;
