"use client";

import { ReactElement } from "react";
import Select from "@/components/atoms/form/select";
import Label from "@/components/atoms/form/label";
import InputWrapper80 from "@/components/atoms/div/wrapper/inputWrapper80";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { SelectGroupType } from "@/types/components/molecules/form/select/SelectGroupType";

const SelectGroup80 = ({ text, options, isRequired, isMulti = false, ...rest }: SelectGroupType): ReactElement => {
  const labelProps: LabelType = {
    text: text,
    isRequired: isRequired || false,
  };

  return (
    <InputWrapper80>
      <Label {...labelProps} />
      <Select options={options} isMulti={isMulti} {...rest} />
    </InputWrapper80>
  );
};

export default SelectGroup80;
