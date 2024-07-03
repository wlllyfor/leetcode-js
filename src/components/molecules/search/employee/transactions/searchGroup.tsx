"use client";

import { ReactElement, useId } from "react";
import SearchWrapper from "@/components/atoms/div/wrapper/searchWrapper";
import SearchInputDate from "@/components/molecules/search/input/searchInputDate";
import SearchInput from "@/components/molecules/search/input/searchInput";
import SearchSelect from "@/components/molecules/search/select/searchSelect";
import FlexWrapperSearch from "@/components/atoms/div/wrapper/flexWrapperSearch";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

const SearchGroup = (): ReactElement => {
  const id = useId();
  const options1: ReactSelectOption[] = [
    /* 入出金種別の選択肢 */
    { value: "A", label: "入金" },
    { value: "B", label: "出金" },
  ];
  const options2: ReactSelectOption[] = [
    /* 拠点の選択肢 */
    { value: "A", label: "YPロジ" },
    { value: "B", label: "義鳥" },
    { value: "C", label: "香港" },
  ];
  const options3: ReactSelectOption[] = [
    /* 口座名の選択肢 */
    { value: "A", label: "A班" },
    { value: "B", label: "B班" },
    { value: "C", label: "C班" },
  ];
  const options4: ReactSelectOption[] = [
    /* 補助科目の選択肢 */
    { value: "A", label: "送料" },
    { value: "B", label: "売上" },
    { value: "C", label: "返金" },
  ];
  return (
    <SearchWrapper>
      <FlexWrapperSearch>
        <SearchSelect
          value={options2} labelText="入出金種別" options={options2} isMulti
          checkboxId={`${id}-payments`}
          checkboxLabelText="デフォルト" checked={false}
        />
        <SearchSelect
          value={options1} labelText="拠点" options={options1} isMulti
          checkboxId={`${id}-hubs`}
          checkboxLabelText="デフォルト" checked={false}
        />
        <SearchInputDate id={`${id}-renewal-period`} text="更新期間" value={""} />
        <SearchInput id={`${id}-order`} text="各種ID" value={""} />
      </FlexWrapperSearch>
      <FlexWrapperSearch>
        <SearchSelect
          value={options3}
          labelText="班" options={options3} isMulti checkboxId={`${id}-group`}
          checkboxLabelText="デフォルト" checked={false}
        />
        <SearchSelect
          value={options4}
          labelText="スタッフ" options={options4} isMulti checkboxId={`${id}-staff`}
          checkboxLabelText="デフォルト" checked={false}
        />
      </FlexWrapperSearch>
    </SearchWrapper>
  );
};

export default SearchGroup;
