"use client";

import { ReactElement, useId } from "react";
import SearchWrapper from "@/components/atoms/div/wrapper/searchWrapper";
import SearchInputDate from "@/components/molecules/search/input/searchInputDate";
import SearchSelect from "@/components/molecules/search/select/searchSelect";
import FlexWrapperSearch from "@/components/atoms/div/wrapper/flexWrapperSearch";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

const SearchGroup = (): ReactElement => {
  const id = useId();
  const options1: ReactSelectOption[] = [
    /* 拠点の選択肢 */
    { value: "A", label: "YPロジ" },
    { value: "B", label: "義鳥" },
    { value: "C", label: "香港" },
  ];
  const options2: ReactSelectOption[] = [
    /* 入出金種別の選択肢 */
    { value: "A", label: "入金" },
    { value: "B", label: "出金" },
  ];
  const options3: ReactSelectOption[] = [
    /* 口座名の選択肢 */
    { value: "A", label: "ABC銀行" },
    { value: "B", label: "○○銀行" },
    { value: "C", label: "××銀行" },
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
          value={options1} labelText="拠点" options={options1} isMulti
          checkboxId={`${id}-hubs`}
          checkboxLabelText="デフォルト" checked={false}
        />
        <SearchSelect
          value={options2} labelText="入出金種別" options={options2} isMulti
          checkboxId={`${id}-payments`}
          checkboxLabelText="デフォルト" checked={false}
        />
        <SearchInputDate id={`${id}-period`} text="期間" value={""} />
      </FlexWrapperSearch>
      <FlexWrapperSearch>
        <SearchSelect
          value={options3} labelText="口座名" options={options3} isMulti
          checkboxId={`${id}-bank-accounts`}
          checkboxLabelText="デフォルト" checked={false}
        />
        <SearchSelect
          value={options4} labelText="補助科目" options={options4} isMulti
          checkboxId={`${id}-auxiliary`}
          checkboxLabelText="デフォルト" checked={false}
        />
      </FlexWrapperSearch>
    </SearchWrapper>
  );
};

export default SearchGroup;
