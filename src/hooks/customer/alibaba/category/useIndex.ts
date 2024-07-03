"use client";

import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { routes } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { Str } from "@/lib/Str";
import { SearchAlibabaCategoryType } from "@/types/alibaba/searchAlibabaCategoryType";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

interface ApiResponse {
  body: {
    result: SearchAlibabaCategoryType;
  };
}

type AlibabaCategoryIndexConditionType = {
  language: "ja" | "en" | "cn";
};

const useIndex = (): {
  alibabaCategories: SearchAlibabaCategoryType | null;
  setAlibabaCategories: Dispatch<SetStateAction<SearchAlibabaCategoryType | null>>;
  getAlibabaCategories: () => Promise<void>;
  isLoading: boolean;
  condition: AlibabaCategoryIndexConditionType;
  setCondition: Dispatch<SetStateAction<AlibabaCategoryIndexConditionType>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
  onlyTopLevelCategoryOptions: ReactSelectOption[];
} => {
  const auth = useRecoilValue(CustomerState);
  const [ alibabaCategories, setAlibabaCategories ] = useState<SearchAlibabaCategoryType | null>(null);
  const [ onlyTopLevelCategoryOptions, setOnlyTopLevelCategoryOptions ] = useState<ReactSelectOption[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  // 検索条件
  const [ condition, setCondition ] = useState<AlibabaCategoryIndexConditionType>({
    language: "ja",
  });

  // 検索条件

  const getAlibabaCategories = useCallback(async (): Promise<void> => {
    CustomerAxios._setToken(auth);
    setValidationErrors(prevState => []);
    const params = {
      language: condition.language,
    };

    try {
      setIsLoading(prevState => true);
      const response = await CustomerAxios.get<ApiResponse>({
        uri: routes.api.alibaba.category.index.url,
        params: Str.decamelizeKeys(params),
      });

      const alibabaProducts = response.data.body.result as SearchAlibabaCategoryType;
      setAlibabaCategories(prevState => alibabaProducts);
    } catch (error) {
      CustomerAxios.showErrors(error);
      const validationErrors = CustomerAxios.get422Errors(error);
      setValidationErrors(prevState => validationErrors);
    } finally {
      setIsLoading(prevState => false);
    }
  }, [ auth, condition ]);

  useEffect(() => {
    if (alibabaCategories?.success) {
      const topLevelCategories = alibabaCategories.result.filter(item => item.level === "1");

      setOnlyTopLevelCategoryOptions(prevState => {
        return topLevelCategories.map(item => {
          return {
            value: item.categoryId,
            label: item.translatedName,
          } as ReactSelectOption;
        });
      });

    } else {
      setOnlyTopLevelCategoryOptions(prevState => []);
    }

  }, [ alibabaCategories ]);

  return {
    alibabaCategories,
    setAlibabaCategories,
    getAlibabaCategories,
    isLoading,
    condition,
    setCondition,
    validationErrors,
    setValidationErrors,
    onlyTopLevelCategoryOptions,
  };
};

export { useIndex };
