"use client";

import { ChangeEvent, ReactElement, useCallback, useState } from "react";
import MallHeader from "@/components/molecules/mall/mallHeader";
import MallInner from "@/components/atoms/div/inner/mallInner";
import MallMenu from "@/components/molecules/mall/mallMenu";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { useIndex as useProductIndex } from "@/hooks/customer/alibaba/product/useIndex";
import { useRouter } from "next/navigation";
import AuthenticatedLayout from "@/components/molecules/layouts/customer/authenticatedLayout";


const Template = ({ hubCode }: { hubCode: string; }): ReactElement => {
  const router = useRouter();

  const { setCondition } = useProductIndex();
  const [ searchKeyword, setSearchKeyword ] = useState<string>("");
  const [ searchCategoryValue, setSearchCategoryValue ] = useState<string>("");
  const [ searchLanguageValue, setSearchLanguageValue ] = useState<string>("ja");

  /** キーワード変更イベント */
  const handleKeywordOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(prev => e.target.value);
    router.replace(`?keyword=${e.target.value}&category=${searchCategoryValue}&language=${searchLanguageValue}`);

    /** カテゴリはAPIの仕様が固まるまで一旦キーワードにつなげて検索をかける */
    setCondition(prev => {
      return {
        ...prev,
        keyword: searchCategoryValue ? `${e.target.value}&${searchCategoryValue}` : e.target.value,
      };
    });
  }, [ setCondition, searchCategoryValue, router, searchLanguageValue ]);


  /** カテゴリ変更イベント */
  const handleCategoryOnChange = useCallback((option: ReactSelectOption) => {
    setSearchCategoryValue(prev => {
      if(typeof option.value !== "string") {
        return "";
      }
      return option.value;
    });

    router.replace(`?keyword=${searchKeyword}&category=${option.value}&language=${searchLanguageValue}`);

    /** カテゴリはAPIの仕様が固まるまで一旦キーワードにつなげて検索をかける */
    setCondition(prev => {
      const searchCategoryValue = typeof option.value === "string" ? option.value : "";
      let updateKeyword = searchKeyword;

      if(searchCategoryValue) {
        updateKeyword = searchKeyword ? `${searchKeyword}&${option.value}` : searchCategoryValue;
      }

      return {
        ...prev,
        keyword: updateKeyword,
      };
    });
  }, [ setCondition, searchKeyword, router, searchLanguageValue ]);


  /** 言語切替イベント */
  const handleLanguageOnChange = useCallback((option: ReactSelectOption) => {
    setSearchLanguageValue(prev => {
      if(typeof option.value !== "string") {
        return "ja";
      }
      return option.value;
    });

    router.replace(`?keyword=${searchKeyword}&category=${searchCategoryValue}&language=${option.value}`);

    setCondition(prev => {
      if(option.value !== "en" && option.value !== "ja" && option.value !== "cn") {
        return prev;
      }

      return {
        ...prev,
        language: option.value,
      };
    });
  }, [ setCondition, searchCategoryValue, router, searchKeyword ]);


  /** パラメータを持って配下の検索結果ページへ遷移する */
  const handleMoveToSearchResult = () => {
    router.push(`/${hubCode}/customer/order/mall/search?keyword=${searchKeyword}&category=${searchCategoryValue}&language=${searchLanguageValue}`,{
      scroll: true,
    });
  };

  return (
    <AuthenticatedLayout hubCode={hubCode} showCustomerMenu={false}>
      <MallHeader
        keyword={searchKeyword}
        category={searchCategoryValue}
        onKeywordChange={handleKeywordOnChange}
        onCategoryChange={handleCategoryOnChange}
        onLanguageChange={handleLanguageOnChange}
        searchFunction={handleMoveToSearchResult}
      />
      <div className="flex">
        <MallMenu />
        <MallInner>
          <div className="max-w-[1254px] mx-auto min-h-[calc(100dvh_-_155px)] bg-white px-[24px] lg:px-[89px] py-[142px]"></div>
        </MallInner>
      </div>
    </AuthenticatedLayout>
  );
};

export default Template;
