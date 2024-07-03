"use client";

import { ReactElement } from "react";
import Select from "@/components/atoms/form/select";
import Label from "@/components/atoms/form/label";
import InputWrapper28 from "@/components/atoms/div/wrapper/inputWrapper28";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { SelectGroupType } from "@/types/components/molecules/form/select/SelectGroupType";

const SelectGroup28 = ({ text, options, isRequired, isMulti = false, ...rest }: SelectGroupType): ReactElement => {
  const labelProps: LabelType = {
    text: text,
    isRequired: isRequired || false,
  };

  return (
    <InputWrapper28>
      <Label {...labelProps} />
      <Select options={options} isMulti={isMulti} {...rest} />
    </InputWrapper28>
  );
};

export default SelectGroup28;
