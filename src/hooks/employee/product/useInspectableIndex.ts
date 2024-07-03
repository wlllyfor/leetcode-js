"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { Str } from "@/lib/Str";
import { ReceiveStockDetailDbTableType } from "@/types/db/receiveStock/receiveStockDetail";
import { ReactSelectInspectOption } from "@/types/reactSelectOptions/ReactSelectInspectOption";

interface ApiResponse {
  body: {
    products: ReceiveStockDetailDbTableType[];
  };
}

type InspectableProductIndexConditionType = {
  keyword: string | null;
  customerId: number | null;
  receiveStockId: number | null;
  employee: ReactSelectOption | null;
};

const useInspectableIndex = (): {
  products: ReceiveStockDetailDbTableType[];
  getProducts: () => Promise<void>;
  condition: InspectableProductIndexConditionType;
  setCondition: Dispatch<SetStateAction<InspectableProductIndexConditionType>>;
  options: ReactSelectInspectOption[];
  setOptions: Dispatch<SetStateAction<ReactSelectInspectOption[]>>;
} => {
  const auth = useRecoilValue(EmployeeState);
  const [ products, setProducts ] = useState<ReceiveStockDetailDbTableType[]>([]);

  // 検索条件
  const [ condition, setCondition ] = useState<InspectableProductIndexConditionType>({
    keyword: null,
    customerId: null,
    receiveStockId: null,
    employee: null,
  });

  const [ options, setOptions ] = useState<ReactSelectInspectOption[]>([]);

  const getProducts = useCallback(async (): Promise<void> => {
    EmployeeAxios._setToken(auth);
    try {
      const params = {
        keyword: condition.keyword,
        customerId: condition.customerId,
        receiveStockId: condition.receiveStockId,
        employeeId: condition.employee?.value,
      };

      const response = await EmployeeAxios.get<ApiResponse>({
        uri: routes.api.employee.receiveStock.inspectableIndex.url,
        params: Str.decamelizeKeys(params),
      });

      const receiveStockDetails = response.data.body.products as ReceiveStockDetailDbTableType[];

      setOptions(prevState => {
        if (!prevState || !receiveStockDetails) return [];
        return receiveStockDetails.map((receiveStockDetail): ReactSelectInspectOption => {
          return {
            label: receiveStockDetail.product.name || "",
            value: receiveStockDetail.id || "",
            receiveStockDetail: receiveStockDetail,
          };
        });
      });

      setProducts(prevState => receiveStockDetails);
    } catch (error) {
      EmployeeAxios.showErrors(error);
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

export { useInspectableIndex };
