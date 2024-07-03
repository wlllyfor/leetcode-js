"use client";

import { ReactElement } from "react";
import Select from "@/components/atoms/form/select";
import Label from "@/components/atoms/form/label";
import InputWrapper56 from "@/components/atoms/div/wrapper/inputWrapper56";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { SelectGroupType } from "@/types/components/molecules/form/select/SelectGroupType";

const SelectGroup56 = ({ text, options, isRequired, isMulti = false, formatOptionLabel }: SelectGroupType): ReactElement => {
  const labelProps: LabelType = {
    text: text,
    isRequired: isRequired || false,
  };

  return (
    <InputWrapper56>
      <Label {...labelProps} />
      <Select options={options} isMulti={isMulti} formatOptionLabel={formatOptionLabel} />
    </InputWrapper56>
  );
};

export default SelectGroup56;
