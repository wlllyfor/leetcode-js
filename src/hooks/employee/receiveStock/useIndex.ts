"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { Str } from "@/lib/Str";
import { Integer } from "@/lib/integer";

interface ApiResponse {
  body: {
    receiveStocks: ReceiveStockDbTableType[];
  };
}

type ReceiveStockIndexConditionType = {
  isUnreceived: boolean;
  receiveStockStatusOptions: ReactSelectOption[];
  hubOptions: ReactSelectOption[];
  groupOptions: ReactSelectOption[];
  employeeOptions: ReactSelectOption[];
  customerId: number | null;
  expectedArrivedOnFrom: string | null;
  expectedArrivedOnTo: string | null;
  createdAtFrom: string | null;
  createdAtTo: string | null;
  // 未入庫在庫一覧用
  receiveStockCode: string | null;
  productId: number | null;
};
const useIndex = (): {
  receiveStocks: ReceiveStockDbTableType[];
  getReceiveStocks: () => Promise<void>;
  condition: ReceiveStockIndexConditionType;
  setCondition: Dispatch<SetStateAction<ReceiveStockIndexConditionType>>;
} => {
  const auth = useRecoilValue(EmployeeState);
  const [ receiveStocks, setReceiveStocks ] = useState<ReceiveStockDbTableType[]>([]);

  // 検索条件
  const [ condition, setCondition ] = useState<ReceiveStockIndexConditionType>({
    isUnreceived: false,
    receiveStockStatusOptions: [],
    hubOptions: [],
    groupOptions: [],
    employeeOptions: [],
    customerId: null,
    expectedArrivedOnFrom: null,
    expectedArrivedOnTo: null,
    createdAtFrom: null,
    createdAtTo: null,
    receiveStockCode: null,
    productId: null,
  });

  const getReceiveStocks = useCallback(async (): Promise<void> => {
    console.log("1");
    EmployeeAxios._setToken(auth);
    console.log("2");
    try {
      console.log("receiveStockStatusValues", condition.receiveStockStatusOptions);
      const receiveStockStatusValues = condition.receiveStockStatusOptions.map(item => item.value).join(",");
      const hubIdListValues = condition.hubOptions.map(item => item.value).join(",");
      const groupIdListValues = condition.groupOptions.map(item => item.value).join(",");
      const employeeIdListValues = condition.employeeOptions.map(item => item.value).join(",");

      const params = {
        unReceived: Integer.boolToInteger(condition.isUnreceived),
        receiveStockStatuses: receiveStockStatusValues,
        hubIdList: hubIdListValues,
        groupIdList: groupIdListValues,
        employeeIdList: employeeIdListValues,
        customerId: condition.customerId,
        expectedArrivedOnFrom: condition.expectedArrivedOnFrom,
        expectedArrivedOnTo: condition.expectedArrivedOnTo,
        createdAtFrom: condition.createdAtFrom,
        createdAtTo: condition.createdAtTo,
        // 未入庫在庫一覧用
        receiveStockCode: condition.receiveStockCode,
        productId: condition.productId,
      };

      const response = await EmployeeAxios.get<ApiResponse>({
        uri: routes.api.employee.receiveStock.index.url,
        params: Str.decamelizeKeys(params),
      });
      const receiveStocks = response.data.body.receiveStocks as ReceiveStockDbTableType[];
      setReceiveStocks(prevState => receiveStocks);
    } catch (error) {
      EmployeeAxios.showErrors(error);
    }
  }, [ auth, condition ]);

  return {
    receiveStocks,
    getReceiveStocks,
    condition,
    setCondition,
  };
};

export { useIndex };
