"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { Str } from "@/lib/Str";
import { SearchAlibabaProductType } from "@/types/alibaba/searchAlibabaProductType";
import { Integer } from "@/lib/integer";

interface ApiResponse {
  body: {
    result: SearchAlibabaProductType;
  };
}

export type AlibabaProductIndexConditionType = {
  keyword: string;
  isOrderFromOne: boolean;
  categoryId: number | null;
  beginPage: number | null;
  language: "ja" | "en" | "cn";
};

const useIndex = (): {
  alibabaProducts: SearchAlibabaProductType | null;
  setAlibabaProducts: Dispatch<SetStateAction<SearchAlibabaProductType | null>>;
  getAlibabaProducts: (page?: number) => Promise<void>;
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  getStartNumber: () => number;
  getEndNumber: () => number;
  pageCount: number;
  condition: AlibabaProductIndexConditionType;
  setCondition: Dispatch<SetStateAction<AlibabaProductIndexConditionType>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(CustomerState);
  const [ alibabaProducts, setAlibabaProducts ] = useState<SearchAlibabaProductType | null>(null);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  // 検索条件
  const [ condition, setCondition ] = useState<AlibabaProductIndexConditionType>({
    keyword: "",
    isOrderFromOne: false,
    categoryId: null,
    beginPage: null,
    language: "ja",
  });

  // ページネーション
  const [ currentPage, setCurrentPage ] = useState<number>(0);

  // ページネーションの設定
  const PER_PAGE = 20;
  const pageCount: number = Math.ceil((alibabaProducts ? alibabaProducts?.totalPage : 0) / PER_PAGE);

  const goToPage = (page: number): void => {
    setCurrentPage(prevState => page);
    getAlibabaProducts(page);
  };

  const goToNextPage = (): void => {
    goToPage(currentPage + 1);
  };

  const goToPrevPage = (): void => {
    goToPage(currentPage - 1);
  };

  /**
   * ページネーションの最初の番号を取得
   *
   * @returns {number}
   */
  const getStartNumber = (): number => {
    let start = Math.max(1, currentPage - 2);
    if (currentPage + 2 > pageCount - 2) {
      start = Math.max(1, start - ((currentPage + 2) - (pageCount - 2)));
    }
    return start;
  };

  /**
   * ページネーションの最後の番号を取得
   * @returns {number}
   */
  const getEndNumber = (): number => {
    let end = Math.min(pageCount - 1, currentPage + 2);

    if (currentPage - 2 < 1) {
      end = Math.min(end + (1 - (currentPage - 2)), pageCount - 1);
    }
    return end;
  };


  // 検索条件

  const getAlibabaProducts = useCallback(async (page?: number): Promise<void> => {
    CustomerAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const targetPageNum = page ?? currentPage;

    const params = {
      keyword: condition.keyword,
      orderFromOne: Integer.boolToInteger(condition.isOrderFromOne),
      language: condition.language,
      beginPage: targetPageNum,
    };

    try {
      setIsLoading(prevState => true);
      const response = await CustomerAxios.get<ApiResponse>({
        uri: routes.api.alibaba.product.index.url,
        params: Str.decamelizeKeys(params),
      });

      const alibabaProducts = response.data.body.result as SearchAlibabaProductType;
      setAlibabaProducts(prevState => alibabaProducts);
      // ページ数更新（UI用）
      setCurrentPage(prevState => targetPageNum);
    } catch (error) {
      CustomerAxios.showErrors(error);
      const validationErrors = CustomerAxios.get422Errors(error);
      setValidationErrors(prevState => validationErrors);
    } finally {
      setIsLoading(prevState => false);
      window.scrollTo(0, 0);
    }
  }, [ auth, condition, currentPage ]);

  return {
    alibabaProducts,
    setAlibabaProducts,
    getAlibabaProducts,
    isLoading,
    currentPage,
    setCurrentPage,
    goToPage,
    goToNextPage,
    goToPrevPage,
    getStartNumber,
    getEndNumber,
    pageCount,
    condition,
    setCondition,
    validationErrors,
    setValidationErrors,
  };
};

export { useIndex };
