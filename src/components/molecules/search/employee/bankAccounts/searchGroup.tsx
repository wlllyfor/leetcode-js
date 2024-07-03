"use client";

import { ReactElement, useCallback, useEffect, useId, useState } from "react";
import SearchWrapper from "@/components/atoms/div/wrapper/searchWrapper";
import SearchSelect from "@/components/molecules/search/select/searchSelect";
import FlexWrapperSearch from "@/components/atoms/div/wrapper/flexWrapperSearch";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

/** 口座マスタ絞り込みパネル */
const SearchGroup = ({
  options,
  defaultOption,
  filterFunction,
}: {
  options: ReactSelectOption[] | undefined;
  defaultOption: ReactSelectOption | null;
  filterFunction: (selectedOptions: ReactSelectOption[] | null) => void;
}): ReactElement => {
  const id = useId();
  const [ isDefaultChecked, setIsDefaultChecked ] = useState<boolean>(true);
  const [ selectOptions, setSelectOptions ] = useState<ReactSelectOption[]>([]);

  useEffect(() => {
    if(defaultOption) {
      /** 初期値設定 */
      setSelectOptions(prevState => [ defaultOption ]);
    }
  }, [ setSelectOptions, defaultOption ]);

  const handleCheckChange = useCallback((checked: boolean): void => {
    setIsDefaultChecked(prevState => checked);

    if(checked === true && defaultOption) {
      setSelectOptions(prevState => [ defaultOption ]);
      filterFunction([ defaultOption ]);
    }
  }, [ setIsDefaultChecked, setSelectOptions, defaultOption, filterFunction ]);

  const handleSelectChange = (value: ReactSelectOption[] | null): void => {
    filterFunction(value);

    setSelectOptions(prevState => {
      if(value === null) {
        return prevState;
      }
      if(value.length === 0) {
        return [];
      }
      return [ ...value ];
    });
  };

  return (
    <SearchWrapper>
      <FlexWrapperSearch>
        <SearchSelect
          value={selectOptions}
          labelText="拠点"
          options={options || []}
          isMulti
          checkboxId={id}
          checkboxLabelText="デフォルト"
          checked={isDefaultChecked}
          changeMultiFunction={handleSelectChange}
          changeCheckFunction={handleCheckChange}
        />
      </FlexWrapperSearch>
    </SearchWrapper>
  );
};

export default SearchGroup;
