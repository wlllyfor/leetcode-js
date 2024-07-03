"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { Str } from "@/lib/Str";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";

interface ApiResponse {
  body: {
    leaveStock: LeaveStockTableDbType;
  };
}

type LeaveStockIndexConditionType = {
  id: number | null;
  trackingNo: string | null;
};
const useFind = (): {
  leaveStock: LeaveStockTableDbType | null;
  getLeaveStock: () => Promise<void>;
  condition: LeaveStockIndexConditionType;
  setCondition: Dispatch<SetStateAction<LeaveStockIndexConditionType>>;
} => {
  const auth = useRecoilValue(EmployeeState);
  const [ leaveStock, setLeaveStock ] = useState<LeaveStockTableDbType | null>(null);

  // 検索条件
  const [ condition, setCondition ] = useState<LeaveStockIndexConditionType>({
    id: null,
    trackingNo: null,
  });

  const getLeaveStock = useCallback(async (): Promise<void> => {
    EmployeeAxios._setToken(auth);

    try {
      const params = {
        id: condition.id,
        trackingNo: condition.trackingNo,
      };

      const response = await EmployeeAxios.get<ApiResponse>({
        uri: routes.api.employee.leaveStock.find.url,
        params: Str.decamelizeKeys(params),
      });

      const leaveStock = response.data.body.leaveStock as LeaveStockTableDbType;
      setLeaveStock(prevState => leaveStock);
    } catch (error) {
      EmployeeAxios.showErrors(error);
    }
  }, [ auth, condition ]);

  return {
    leaveStock,
    getLeaveStock,
    condition,
    setCondition,
  };
};

export { useFind };
