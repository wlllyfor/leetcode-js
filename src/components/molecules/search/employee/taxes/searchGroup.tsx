"use client";

import { ReactElement, useId } from "react";
import SearchWrapper from "@/components/atoms/div/wrapper/searchWrapper";
import SearchSelect from "@/components/molecules/search/select/searchSelect";
import FlexWrapperSearch from "@/components/atoms/div/wrapper/flexWrapperSearch";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

const SearchGroup = ({
  hubOptions,
  handleOnChangeHub,
  value,
}: {
  hubOptions: ReactSelectOption[];
  handleOnChangeHub: (option: ReactSelectOption[]) => void;
  value: ReactSelectOption[];
}): ReactElement => {
  const id = useId();

  return (
    <SearchWrapper>
      <FlexWrapperSearch>
        <SearchSelect
          value={value}
          labelText="拠点" options={hubOptions} isMulti checkboxId={id}
          checkboxLabelText="デフォルト"
          checked={false} changeMultiFunction={handleOnChangeHub}
        />
      </FlexWrapperSearch>
    </SearchWrapper>
  );
};

export default SearchGroup;
