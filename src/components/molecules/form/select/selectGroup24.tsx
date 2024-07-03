"use client";

import { ReactElement } from "react";
import Select from "@/components/atoms/form/select";
import Label from "@/components/atoms/form/label";
import InputWrapper24 from "@/components/atoms/div/wrapper/inputWrapper24";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { SelectGroupType } from "@/types/components/molecules/form/select/SelectGroupType";

const SelectGroup24 = ({ text, options, isRequired, isMulti = false }: SelectGroupType): ReactElement => {
  const labelProps: LabelType = {
    text: text,
    isRequired: isRequired || false,
  };

  return (
    <InputWrapper24>
      <Label {...labelProps} />
      <Select options={options} isMulti={isMulti} />
    </InputWrapper24>
  );
};

export default SelectGroup24;
