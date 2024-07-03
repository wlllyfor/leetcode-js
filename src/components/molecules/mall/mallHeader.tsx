"use client";

import { ChangeEvent, ReactElement, useState } from "react";
import MallCategoryButton from "@/components/atoms/button/mallCategoryButton";
import MallHeaderSearch from "@/components/molecules/mall/mallHeaderSearch";
import MallHeaderTop from "@/components/molecules/mall/mallHeaderTop";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

const MallHeader = ({
  keyword,
  category,
  language,
  onKeywordChange,
  onCategoryChange,
  onLanguageChange,
  searchFunction,
}: {
  keyword: string;
  /** ハードコーディング用 */
  category?: string;
  language?: string;
  onKeywordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange?: (option: ReactSelectOption) => void;
  onLanguageChange?: (option: ReactSelectOption) => void;
  searchFunction?: (page?: number) => void;
}): ReactElement => {
  const [ isFilterVisible, setFilterVisible ] = useState<boolean>(false);

  return (
    <>
      <MallHeaderTop
        handleSearchGroupButtonClick={() => setFilterVisible(prev => !prev)}
        isFilterVisible={isFilterVisible}
        keyword={keyword}
        category={category}
        language={language}
        onKeywordChange={onKeywordChange}
        onCategoryChange={onCategoryChange}
        onLanguageChange={onLanguageChange}
        searchFunction={searchFunction}
      />
      {isFilterVisible && <MallHeaderSearch />}
      {/* カテゴリーボタン一覧 */}
      <div className="flex bg-[#1F2937] justify-center py-1">
        <MallCategoryButton text={"シューズ"} onClick={() => alert("検索機能は準備中です。(カテゴリ検索)")} />
        <MallCategoryButton text={"バッグ"} onClick={() => alert("検索機能は準備中です。(カテゴリ検索)")} />
      </div>
    </>
  );
};

export default MallHeader;
