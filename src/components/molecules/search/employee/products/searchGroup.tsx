"use client";

import { ReactElement, useId } from "react";
import SearchWrapper from "@/components/atoms/div/wrapper/searchWrapper";
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
    /* 班の選択肢 */
    { value: "A", label: "A班" },
    { value: "B", label: "B班" },
  ];
  const options3: ReactSelectOption[] = [
    /* 顧客IDの選択肢 */
    { value: "A", label: "YP-00000" },
    { value: "B", label: "YP-00000" },
    { value: "C", label: "YP-00000" },
  ];
  const options4: ReactSelectOption[] = [
    /* スタッフの選択肢 */
    { value: "A", label: "田中" },
    { value: "B", label: "鈴木" },
    { value: "C", label: "佐藤" },
  ];
  const options5: ReactSelectOption[] = [
    /* プランの選択肢 */
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
  ];
  const options6: ReactSelectOption[] = [
    /* ステータスの選択肢 */
    { value: "A", label: "在籍" },
    { value: "B", label: "退職" },
    { value: "C", label: "休職" },
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
          value={options2} labelText="班" options={options2} isMulti
          checkboxId={`${id}-group`}
          checkboxLabelText="デフォルト" checked={false}
        />
        <SearchSelect
          value={options3} labelText="顧客ID" options={options3} isMulti
          checkboxId={`${id}-customer-id`}
          checkboxLabelText="デフォルト" checked={false}
        />
        <SearchInput id={`${id}-arrival`} text="入荷ID" value={""} />
        <SearchInput id={`${id}-shipping`} text="出荷ID" value={""} />
      </FlexWrapperSearch>
      <FlexWrapperSearch>
        <SearchSelect
          value={options4} labelText="担当スタッフ" options={options4} isMulti
          checkboxId={`${id}-staff`}
          checkboxLabelText="デフォルト" checked={false}
        />
        <SearchSelect
          value={options5} labelText="プラン" options={options5} isMulti
          checkboxId={`${id}-plan`}
          checkboxLabelText="デフォルト" checked={false}
        />
        <SearchSelect
          value={options6} labelText="ステータス" options={options6} isMulti
          checkboxId={`${id}-status`}
          checkboxLabelText="デフォルト" checked={false}
        />
        <SearchInput id={`${id}-product`} text="商品" value={""} />
        <SearchInput id={`${id}-month`} text="月" value={""} />
      </FlexWrapperSearch>
    </SearchWrapper>
  );
};

export default SearchGroup;
