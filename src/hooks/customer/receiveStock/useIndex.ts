"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    receiveStocks: ReceiveStockDbTableType[];
  };
}

type ReceiveStockIndexConditionType = {
  receiveStockStatuses: ReactSelectOption[];
  sku: string;
};

const useIndex = (): {
  receiveStocks: ReceiveStockDbTableType[];
  setReceiveStocks: Dispatch<SetStateAction<ReceiveStockDbTableType[]>>;
  getReceiveStocks: () => Promise<void>;
  condition: ReceiveStockIndexConditionType;
  setCondition: Dispatch<SetStateAction<ReceiveStockIndexConditionType>>;
} => {
  const auth = useRecoilValue(CustomerState);
  const [ receiveStocks, setReceiveStocks ] = useState<ReceiveStockDbTableType[]>([]);

  // 検索条件
  const [ condition, setCondition ] = useState<ReceiveStockIndexConditionType>({
    receiveStockStatuses: [],
    sku: "",
  });

  const getReceiveStocks = useCallback(async (): Promise<void> => {
    CustomerAxios._setToken(auth);
    const receiveStockStatusValues = condition.receiveStockStatuses.map(status => status.value).join(",");
    const params = {
      receiveStockStatuses: receiveStockStatusValues,
      sku: condition.sku,
    };

    try {
      const response = await CustomerAxios.get<ApiResponse>({
        uri: routes.api.customer.receiveStock.index.url,
        params: Str.decamelizeKeys(params),
      });

      const receiveStocks = response.data.body.receiveStocks as ReceiveStockDbTableType[];
      setReceiveStocks(prevState => receiveStocks);
    } catch (error) {
      CustomerAxios.showErrors(error);
    }
  }, [ auth, condition ]);

  return {
    receiveStocks,
    setReceiveStocks,
    getReceiveStocks,
    condition,
    setCondition,
  };
};

export { useIndex };
