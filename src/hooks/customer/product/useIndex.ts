"use client";

import { ProductDbTableType } from "@/types/db/product/product";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { enumCaseProductType } from "@/types/enum/enumCaseProductType";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    products: ProductDbTableType[];
  };
}

type ProductIndexConditionType = {
  sku: string | null;
  productType: string | null;
};

const useIndex = (): {
  products: ProductDbTableType[];
  getProducts: () => Promise<void>;
  condition: ProductIndexConditionType;
  setCondition: Dispatch<SetStateAction<ProductIndexConditionType>>;
  options: ReactSelectOption[];
  setOptions: Dispatch<SetStateAction<ReactSelectOption[]>>;
} => {
  const auth = useRecoilValue(CustomerState);
  const [ products, setProducts ] = useState<ProductDbTableType[]>([]);

  // 検索条件
  const [ condition, setCondition ] = useState<ProductIndexConditionType>({
    productType: null,
    sku: "",
  });

  const [ options, setOptions ] = useState<ReactSelectOption[]>([]);

  const getProducts = useCallback(async (): Promise<void> => {
    CustomerAxios._setToken(auth);
    const params = {
      sku: condition.sku,
      product_type: condition.productType === enumCaseProductType.all ? null : condition.productType,
    };

    try {
      const response = await CustomerAxios.get<ApiResponse>({
        uri: routes.api.customer.product.index.url,
        params: Str.decamelizeKeys(params),
      });
      const products: ProductDbTableType[] = response.data.body.products;

      setOptions(prevState => {
        if (!prevState || !products) return [];
        return products.map((product): ReactSelectOption => {
          return {
            label: product.name,
            value: product.id,
          } as ReactSelectOption;
        });
      });

      setProducts(prevState => products);
    } catch (error) {
      CustomerAxios.showErrors(error);
    }
  }, [ condition, auth ]);

  return {
    products,
    getProducts,
    condition,
    setCondition,
    options,
    setOptions,
  };
};

export { useIndex };
