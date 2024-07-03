"use client";

import { ReactElement } from "react";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import InputWrapper24 from "@/components/atoms/div/wrapper/inputWrapper24";
import Select from "@/components/atoms/form/select";
import Label from "@/components/atoms/form/label";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { SelectRowGroupType } from "@/types/components/molecules/form/select/SelectRowGroupType";

const SelectGroup24Row = ({ text, options, isRequired, isMulti = false }: SelectRowGroupType): ReactElement => {
  const labelProps: LabelType = {
    text: text,
    isRequired: isRequired || false,
  };

  return (
    <>
      <Label {...labelProps} />
      <FlexWrapper>
        {options.map((optionArray, index) => (
          <InputWrapper24 key={index}>
            <Select options={optionArray} isMulti={isMulti} />
          </InputWrapper24>
        ))}
      </FlexWrapper>
    </>

  );
};

export default SelectGroup24Row;
