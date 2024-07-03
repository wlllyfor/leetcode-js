"use client";

import { ReactElement } from "react";
import SearchInputWrapper from "@/components/atoms/div/wrapper/searchInputWrapper";
import Select from "@/components/atoms/form/select";
import Label from "@/components/atoms/form/label";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { SearchSelectType } from "@/types/components/molecules/search/customer/select/SearchSelectType";

const SearchSelect = ({
  labelText,
  isRequired = false,
  options,
  isMulti,
  formatOptionLabel,
  changeFunction,
  changeMultiFunction,
  value,
  placeholder,
}: SearchSelectType): ReactElement => {
  const labelProps: LabelType = {
    text: labelText,
    isRequired: isRequired,
  };

  return (
    <SearchInputWrapper>
      <div className="min-w-[465px]">
        <div className="flex items-center gap-2">
          <Label {...labelProps} />
        </div>
        <Select
          options={options}
          isMulti={isMulti}
          changeFunction={changeFunction}
          changeMultiItemFunction={changeMultiFunction}
          formatOptionLabel={formatOptionLabel}
          value={value}
          placeholder={placeholder}
        />
      </div>
    </SearchInputWrapper>
  );
};

export default SearchSelect;
