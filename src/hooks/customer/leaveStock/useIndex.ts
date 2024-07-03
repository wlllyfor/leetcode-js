"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    leaveStocks: LeaveStockTableDbType[];
  };
}

type LeaveStockIndexConditionType = {
  leaveStockStatuses: ReactSelectOption[];
  sku: string;
  name: string;
  trackingNo: string;
  orderCode: string;
};

const useIndex = (): {
  leaveStocks: LeaveStockTableDbType[];
  setLeaveStocks: Dispatch<SetStateAction<LeaveStockTableDbType[]>>;
  getLeaveStocks: () => Promise<void>;
  condition: LeaveStockIndexConditionType;
  setCondition: Dispatch<SetStateAction<LeaveStockIndexConditionType>>;
} => {
  const auth = useRecoilValue(CustomerState);
  const [ leaveStocks, setLeaveStocks ] = useState<LeaveStockTableDbType[]>([]);

  // 検索条件
  const [ condition, setCondition ] = useState<LeaveStockIndexConditionType>({
    leaveStockStatuses: [],
    sku: "",
    name: "",
    trackingNo: "",
    orderCode: "",
  });

  const getLeaveStocks = useCallback(async (): Promise<void> => {
    CustomerAxios._setToken(auth);

    const leaveStockStatusValues = condition.leaveStockStatuses.map(status => status.value).join(",");
    const params = {
      leaveStockStatuses: leaveStockStatusValues,
      sku: condition.sku,
      name: condition.name,
      trackingNo: condition.trackingNo,
      orderCode: condition.orderCode,
    };

    try {
      const response = await CustomerAxios.get<ApiResponse>({
        uri: routes.api.customer.leaveStock.index.url,
        params: Str.decamelizeKeys(params),
      });

      const leaveStocks = response.data.body.leaveStocks as LeaveStockTableDbType[];
      setLeaveStocks(prevState => leaveStocks);
    } catch (error) {
      CustomerAxios.showErrors(error);
    }
  }, [ auth, condition ]);

  return {
    leaveStocks,
    setLeaveStocks,
    getLeaveStocks,
    condition,
    setCondition,
  };
};

export { useIndex };
