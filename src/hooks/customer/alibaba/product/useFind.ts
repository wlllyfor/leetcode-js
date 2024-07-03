"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { Str } from "@/lib/Str";
import { AlibabaProductFindType } from "@/types/alibaba/alibabaProductFindType";

interface ApiResponse {
  body: {
    result: AlibabaProductFindType;
  };
}

const useFind = (): {
  alibabaProduct: AlibabaProductFindType | null;
  setAlibabaProduct: Dispatch<SetStateAction<AlibabaProductFindType | null>>;
  findAlibabaProduct: (productId: number) => Promise<void>;
  isLoading: boolean;
} => {
  const auth = useRecoilValue(CustomerState);
  const [ alibabaProduct, setAlibabaProduct ] = useState<AlibabaProductFindType | null>(null);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  // 検索条件

  const findAlibabaProduct = useCallback(async (productId: number): Promise<void> => {
    CustomerAxios._setToken(auth);
    const params = {
      productId: productId,
    };

    try {
      setIsLoading(prevState => true);
      const response = await CustomerAxios.get<ApiResponse>({
        uri: routes.api.alibaba.product.find.url,
        params: Str.decamelizeKeys(params),
      });

      const alibabaProduct = response.data.body.result as AlibabaProductFindType;
      setAlibabaProduct(prevState => alibabaProduct);
    } catch (error) {
      CustomerAxios.showErrors(error);
    } finally {
      setIsLoading(prevState => false);
    }
  }, [ auth ]);

  return {
    alibabaProduct,
    setAlibabaProduct,
    findAlibabaProduct,
    isLoading,
  };
};

export { useFind };
