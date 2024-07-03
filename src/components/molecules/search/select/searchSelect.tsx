"use client";

import { ReactElement } from "react";
import InputCheckbox from "@/components/molecules/form/input/inputCheckbox";
import SearchInputWrapper from "@/components/atoms/div/wrapper/searchInputWrapper";
import Select from "@/components/atoms/form/select";
import Label from "@/components/atoms/form/label";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { InputCheckboxType } from "@/types/components/molecules/form/input/InputCheckboxType";
import { SearchSelectType } from "@/types/components/molecules/search/select/SearchSelectType";
import InputWrapper56 from "@/components/atoms/div/wrapper/inputWrapper56";

const SearchSelect = ({
  labelText,
  isRequired = false,
  options,
  isMulti,
  checkboxId,
  checkboxLabelText,
  checked,
  changeCheckFunction,
  changeFunction,
  changeMultiFunction,
  value,
}: SearchSelectType): ReactElement => {
  const labelProps: LabelType = {
    text: labelText,
    isRequired: isRequired,
    fontSize: "10px",
  };
  const InputCheckboxProps: InputCheckboxType = {
    id: checkboxId,
    text: checkboxLabelText,
    checked: checked,
    changeFunction: changeCheckFunction,
  };

  return (
    <SearchInputWrapper>
      <InputWrapper56>
        <div className="flex items-center gap-2 text-[10px]">
          <Label {...labelProps} />
          <InputCheckbox {...InputCheckboxProps} />
        </div>
        <Select
          options={options}
          isMulti={isMulti}
          changeFunction={changeFunction}
          changeMultiItemFunction={changeMultiFunction}
          value={value}
        />
      </InputWrapper56>
    </SearchInputWrapper>
  );
};

export default SearchSelect;
