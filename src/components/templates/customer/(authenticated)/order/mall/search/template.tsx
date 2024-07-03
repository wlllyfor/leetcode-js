"use client";

import { ChangeEvent, ReactElement, useCallback, useEffect, useState } from "react";
import MallHeader from "@/components/molecules/mall/mallHeader";
import MallInner from "@/components/atoms/div/inner/mallInner";
import MallMenu from "@/components/molecules/mall/mallMenu";
import { AlibabaProductIndexConditionType, useIndex as useAlibabaProductIndex } from "@/hooks/customer/alibaba/product/useIndex";
import { Else, If, Then } from "react-if";
import Loading from "@/components/molecules/common/loading";
import AuthenticatedLayout from "@/components/molecules/layouts/customer/authenticatedLayout";
import { SearchAlibabaProductType } from "@/types/alibaba/searchAlibabaProductType";
import { UUID } from "@/lib/uuid";
import MallProduct from "@/components/molecules/mall/mallProduct";
import CheckAndLabel from "@/components/molecules/checkAndLabel";
import { AlibabaProductIndexPageProps } from "@/pagePropInterfaces/alibabaProductIndexPageProps";
import { Pagination } from "@/components/molecules/search/customer/order/pagination";
import { useIndex as useCategoryIndex } from "@/hooks/customer/alibaba/category/useIndex";
import Paragraph from "@/components/atoms/text/paragraph";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { useRouter } from "next/navigation";


const Template = ({ params, searchParams }: AlibabaProductIndexPageProps): ReactElement => {
  const [ searchKeyword, setSearchKeyword ] = useState<string>(searchParams?.keyword?.toString() ?? "");
  const [ searchCategoryValue, setSearchCategoryValue ] = useState<string>(searchParams?.category?.toString() ?? "");
  const [ searchLanguageValue, setSearchLanguageValue ] = useState<string>(searchParams?.language?.toString() ?? "ja");
  const router = useRouter();

  const {
    getAlibabaProducts,
    alibabaProducts,
    isLoading: isProductLoading,
    currentPage,
    goToPage,
    getStartNumber,
    getEndNumber,
    pageCount,
    condition,
    setCondition,
    validationErrors,
    setValidationErrors,
  } = useAlibabaProductIndex();

  const [ isInit, setIsInit ] = useState<boolean>(false);
  const [ isInitFetch, setIsInitFetch ] = useState<boolean>(false);
  const [ isRenderingLoading, setIsRenderingLoading ] = useState<boolean>(false);

  const { getAlibabaCategories } = useCategoryIndex();

  // use effects
  /**
   * 画面初期描画
   */
  useEffect((): void => {
    if(!isInit) {
      (async (): Promise<void> => {
        setValidationErrors(prevState => []);

        const keyword = (() => {
          const searchKeyword = searchParams?.keyword?.toString() ?? "";
          setSearchKeyword(prevState => searchKeyword);

          const searchCategory = searchParams?.category?.toString() ?? "";
          setSearchCategoryValue(prevState => searchParams?.category?.toString() ?? "");

          let updateKeyword = searchKeyword;

          if(searchCategory) {
            updateKeyword = searchKeyword ? `${searchKeyword}&${searchCategory}` : searchCategory;
          }
          return updateKeyword;
        })();

        const language: AlibabaProductIndexConditionType["language"] = (() => {
          const temp = searchParams?.language?.toString();
          const searchLanguage = temp === "en" || temp === "ja" || temp === "cn" ? temp : "ja";
          return searchLanguage;
        })();

        setSearchLanguageValue(prevState => language);

        setCondition(prevState => {
          return {
            ...prevState,
            keyword: keyword,
            beginPage: 0,
            language: language,
            isOrderFromOne: false,
          };
        });
        /** MEMO: searchCategoryValue で一旦代用するので fetch しない */
        // await getAlibabaCategories();

        setIsRenderingLoading(prevState => false);
      })();
      setIsInit(prevState => true);
    }
  }, [ getAlibabaCategories, searchParams, setCondition, setValidationErrors, isInit ]);

  useEffect(():void => {
    if(isInit && !isInitFetch && condition.keyword) {
      (async(): Promise<void> => {
        await getAlibabaProducts();
        setIsInitFetch(prevState => true);
      })();
    }
  }, [ isInitFetch, isInit, condition.keyword, getAlibabaProducts ]);


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

    /** NOTE: カテゴリはAPIの仕様が固まるまで一旦キーワードにつなげて検索をかける */
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


  /** 1点から注文可能チェックボックス変更イベント */
  const handleOrderFromOneOnChange = (): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        isOrderFromOne: !condition.isOrderFromOne,
      };
    });
  };

  if (isRenderingLoading) {
    return <Loading />;
  }

  return (
    <AuthenticatedLayout hubCode={params.hub_code} showCustomerMenu={false}>
      <MallHeader
        keyword={searchKeyword}
        category={searchCategoryValue}
        language={searchLanguageValue}
        onKeywordChange={handleKeywordOnChange}
        onCategoryChange={handleCategoryOnChange}
        onLanguageChange={handleLanguageOnChange}
        searchFunction={getAlibabaProducts}
      />
      <div className="flex">
        <MallMenu />
        <MallInner>
          <div className="max-w-[1254px] mx-auto min-h-[calc(100dvh_-_155px)] bg-white px-[24px] lg:px-[89px] pt-4 pb-[142px]">
            <CheckAndLabel
              id={UUID.generate()} text={"1点から注文可能"} checked={condition.isOrderFromOne}
              changeFunction={handleOrderFromOneOnChange}
            />
            <div className="py-8 px-6">
              <If condition={isProductLoading}>
                <Then>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                    <Loading />
                  </div>
                </Then>
                <Else>
                  <IfProductsNotFound
                    isProductLoading={isProductLoading}
                    alibabaProducts={alibabaProducts}
                  />
                  <If condition={alibabaProducts && alibabaProducts.success}>
                    <Then>
                      <ProductsContainer alibabaProducts={alibabaProducts} />
                      <div className="flex justify-end items-start my-4">
                        <Pagination
                          currentPage={currentPage} pageCount={pageCount} goToPage={goToPage}
                          getEndNumber={getEndNumber} getStartNumber={getStartNumber}
                        />
                      </div>
                    </Then>
                  </If>
                  <ValidationErrorTexts errors={validationErrors} />
                </Else>
              </If>
            </div>
          </div>
        </MallInner>
      </div>
    </AuthenticatedLayout>
  );
};

/** 商品カードのリストコンポーネント */
const ProductsContainer = ({ alibabaProducts }: {
  alibabaProducts: SearchAlibabaProductType | null;
}): ReactElement => {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-8">
      {alibabaProducts && alibabaProducts.success && alibabaProducts.data &&
        (alibabaProducts as SearchAlibabaProductType).data.map((product, index) => {
          return (
            <li key={`product-${index}`}>
              <MallProduct key={UUID.generate()} product={product} hub={alibabaProducts.hub} widthClassName="max-w-[200px] w-full" />
            </li>
          );
        })
      }
    </ul>
  );
};

/** 1件もヒットしない場合のコンポーネント */
const IfProductsNotFound = ({ isProductLoading, alibabaProducts }: {
  isProductLoading: boolean;
  alibabaProducts: SearchAlibabaProductType | null;
}): ReactElement => {
  return (
    <If condition={!isProductLoading && alibabaProducts && !alibabaProducts.data || alibabaProducts?.data.length === 0 && alibabaProducts.success}>
      <Then>
        <Paragraph text="条件に一致する商品は見つかりませんでした" />
      </Then>
    </If>
  );
};

/** バリデーションエラーテキスト表示コンポーネント */
const ValidationErrorTexts = ({ errors } : { errors: string[]; }): ReactElement => {
  return (
    <If condition={errors.length > 0}>
      <Then>
        <div className="flex justify-center items-center pt-8">
          {errors.map((error, index) => (
            <Paragraph text={error} key={`product-error-${index}`} color="red-500" />
          ))}
        </div>
      </Then>
    </If>
  );
};

export default Template;
