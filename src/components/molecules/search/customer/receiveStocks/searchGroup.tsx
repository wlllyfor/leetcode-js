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
    /* ステータスの選択肢 */
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
  ];
  return (
    <SearchWrapper>
      <FlexWrapperSearch>
        <SearchSelect
          value={options1} labelText="ステータス" options={options1} isMulti
          checkboxId={`${id}-status`}
          checkboxLabelText="デフォルト" checked={false}
        />
        <SearchInput id={`${id}-product`} text="商品で検索" placeholder="商品名、SKU,バーコード情報（FNSKU、JAN）商品ID" value={""} />
      </FlexWrapperSearch>
    </SearchWrapper>
  );
};

export default SearchGroup;
