"use client";

import { ReactElement } from "react";
import InputGroup44 from "@/components/molecules/form/input/inputGroup44";
import SearchInputWrapper from "@/components/atoms/div/wrapper/searchInputWrapper";
import { InputGroupType } from "@/types/components/molecules/form/input/InputGroupType";
import { SearchInputType } from "@/types/components/molecules/search/input/SearchInputType";

const SearchInput = ({ text, id, value, placeholder, handleValueOnChange }: SearchInputType): ReactElement => {
  const InputGroupProps: InputGroupType = {
    id: id,
    text: text,
    value: value,
    placeholder: placeholder,
    onChange: handleValueOnChange,
  };

  return (
    <SearchInputWrapper>
      <InputGroup44 {...InputGroupProps} />
    </SearchInputWrapper>
  );
};

export default SearchInput;
