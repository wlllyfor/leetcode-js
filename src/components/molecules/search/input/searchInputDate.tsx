"use client";

import { ReactElement } from "react";
import InputDateGroup44 from "@/components/molecules/form/input/inputDateGroup44";
import SearchInputWrapper from "@/components/atoms/div/wrapper/searchInputWrapper";
import { InputDateGroupType } from "@/types/components/molecules/form/input/InputDateGroupType";
import { SearchInputType } from "@/types/components/molecules/search/input/SearchInputType";

const SearchInputDate = ({ text, id }: SearchInputType): ReactElement => {
  const InputGroupProps: InputDateGroupType = {
    id: id,
    labelText: text,
    isRange: true,
  };

  return (
    <SearchInputWrapper>
      <InputDateGroup44 {...InputGroupProps} />
    </SearchInputWrapper>
  );
};

export default SearchInputDate;
