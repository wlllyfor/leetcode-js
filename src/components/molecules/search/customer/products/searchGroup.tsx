"use client";

import { ReactElement } from "react";
import SearchWrapper from "@/components/atoms/div/wrapper/searchWrapper";
import SearchInput from "@/components/molecules/search/input/searchInput";

const SearchGroup = (): ReactElement => {
  return (
    <SearchWrapper>
      <SearchInput id={`sku`} text="商品で検索" value="" />
    </SearchWrapper>
  );
};

export default SearchGroup;
