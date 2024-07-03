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
    /* スタッフの選択肢 */
    { value: "A", label: "田中" },
    { value: "B", label: "鈴木" },
    { value: "C", label: "佐藤" },
  ];
  const options4: ReactSelectOption[] = [
    /* 班の選択肢 */
    { value: "A", label: "A班" },
    { value: "B", label: "B班" },
    { value: "C", label: "C班" },
  ];
  const options5: ReactSelectOption[] = [
    /* 科目の選択肢 */
    { value: "A", label: "科目A" },
    { value: "B", label: "科目B" },
    { value: "C", label: "科目C" },
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
        <SearchSelect
          value={options3} labelText="スタッフ" options={options3} isMulti
          checkboxId={`${id}-staff`}
          checkboxLabelText="デフォルト" checked={false}
        />
      </FlexWrapperSearch>
      <FlexWrapperSearch>
        <SearchSelect
          value={options4} labelText="班" options={options4} isMulti
          checkboxId={`${id}-group`}
          checkboxLabelText="デフォルト" checked={false}
        />
        <SearchSelect
          value={options5} labelText="科目" options={options5} isMulti
          checkboxId={`${id}-subject`}
          checkboxLabelText="デフォルト" checked={false}
        />
        <SearchInput id={`${id}-order`} text="注文,出荷,入荷,検品ID" value={""} />
        <SearchInputDate id={`${id}-period`} text="期間" value={""} />
      </FlexWrapperSearch>
    </SearchWrapper>
  );
};

export default SearchGroup;
