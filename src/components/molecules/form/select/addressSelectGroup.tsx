"use client";

import { ReactElement, useId } from "react";
import Select from "@/components/atoms/form/select";
import InputWrapper24 from "@/components/atoms/div/wrapper/inputWrapper24";
import { SelectGroupType } from "@/types/components/molecules/form/select/SelectGroupType";

const AddressSelectGroup = ({ options, isMulti = false, changeFunction, ...rest }: SelectGroupType): ReactElement => {
  const id = useId();

  return (
    <InputWrapper24>
      <Select options={options} isMulti={isMulti} id={id} changeFunction={changeFunction} {...rest} />
    </InputWrapper24>
  );
};

export default AddressSelectGroup;
