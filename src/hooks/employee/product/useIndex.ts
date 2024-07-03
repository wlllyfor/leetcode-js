"use client";

import { ProductDbTableType } from "@/types/db/product/product";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    products: ProductDbTableType[];
  };
}

type ProductIndexConditionType = {
  sku: string;
  customerId: number | null;
};

const useIndex = (): {
  products: ProductDbTableType[];
  getProducts: () => Promise<void>;
  condition: ProductIndexConditionType;
  setCondition: Dispatch<SetStateAction<ProductIndexConditionType>>;
  options: ReactSelectOption[];
  setOptions: Dispatch<SetStateAction<ReactSelectOption[]>>;
} => {
  const auth = useRecoilValue(EmployeeState);
  const [ products, setProducts ] = useState<ProductDbTableType[]>([]);

  // 検索条件
  const [ condition, setCondition ] = useState<ProductIndexConditionType>({
    sku: "",
    customerId: null,
  });

  const [ options, setOptions ] = useState<ReactSelectOption[]>([]);

  const getProducts = useCallback(async (): Promise<void> => {
    EmployeeAxios._setToken(auth);

    const params = {
      sku: condition.sku,
      customerId: condition.customerId,
    };

    try {
      const response = await EmployeeAxios.get<ApiResponse>({
        uri: routes.api.employee.product.index.url,
        params: Str.decamelizeKeys(params),
      });

      const products = response.data.body.products as ProductDbTableType[];

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
      EmployeeAxios.showErrors(error);
    }
  }, [ auth, condition.sku, condition.customerId ]);

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
