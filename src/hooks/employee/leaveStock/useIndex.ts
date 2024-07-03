"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { Str } from "@/lib/Str";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";
import { Integer } from "@/lib/integer";

interface ApiResponse {
  body: {
    leaveStocks: LeaveStockTableDbType[];
  };
}

type LeaveStockIndexConditionType = {
  /**
   * 未出庫在庫一覧フラグ true: 未出庫在庫一覧
   */
  isUnLeaved: boolean;
  leaveStockStatusOptions: ReactSelectOption[];
  hubOptions: ReactSelectOption[];
  groupOptions: ReactSelectOption[];
  leaveStockCode: string | null;
  isDomestic: boolean | null;
  leaveStartedOnFrom: string | null;
  leaveStartedOnTo: string | null;
  leavedOnFrom: string | null;
  leavedOnTo: string | null;
  trackingNo: string | null;
  orderCode: string | null;

  // 未出庫在庫一覧用
  employeeOptions: ReactSelectOption[];
  customerId: number | null;
  receiveStockCode: string | null;
  productId: number | null;
};
const useIndex = (): {
  leaveStocks: LeaveStockTableDbType[];
  getLeaveStocks: () => Promise<void>;
  condition: LeaveStockIndexConditionType;
  setCondition: Dispatch<SetStateAction<LeaveStockIndexConditionType>>;
} => {
  const auth = useRecoilValue(EmployeeState);
  const [ leaveStocks, setLeaveStocks ] = useState<LeaveStockTableDbType[]>([]);

  // 検索条件
  const [ condition, setCondition ] = useState<LeaveStockIndexConditionType>({
    isUnLeaved: false,
    leaveStockStatusOptions: [],
    hubOptions: [],
    groupOptions: [],
    leaveStockCode: null,
    isDomestic: null,
    leaveStartedOnFrom: null,
    leaveStartedOnTo: null,
    leavedOnFrom: null,
    leavedOnTo: null,
    trackingNo: null,
    orderCode: null,

    // 未出庫在庫一覧用
    employeeOptions: [],
    customerId: null,
    receiveStockCode: null,
    productId: null,
  });

  const getLeaveStocks = useCallback(async (): Promise<void> => {
    EmployeeAxios._setToken(auth);

    try {
      const leaveStockStatusValues = condition.leaveStockStatusOptions.map(item => item.value).join(",");
      const hubIdListValues = condition.hubOptions.map(item => item.value).join(",");
      const groupIdListValues = condition.groupOptions.map(item => item.value).join(",");
      const employeeIdListValues = condition.employeeOptions.map(item => item.value).join(",");

      const isDomestic = condition.isDomestic === null ? null : Integer.boolToInteger(condition.isDomestic);
      const params = {
        isUnLeaved: Integer.boolToInteger(condition.isUnLeaved),
        leaveStockStatuses: leaveStockStatusValues,
        hubIdList: hubIdListValues,
        groupIdList: groupIdListValues,
        leaveStockCode: condition.leaveStockCode,
        isDomestic: isDomestic,
        leaveStartedOnFrom: condition.leaveStartedOnFrom,
        leaveStartedOnTo: condition.leaveStartedOnTo,
        leavedOnFrom: condition.leavedOnFrom,
        leavedOnTo: condition.leavedOnTo,
        trackingNo: condition.trackingNo,
        orderCode: condition.orderCode,

        // 未出庫在庫一覧用
        employeeIdList: employeeIdListValues,
        customerId: condition.customerId,
        receiveStockCode: condition.receiveStockCode,
        productId: condition.productId,
      };

      const response = await EmployeeAxios.get<ApiResponse>({
        uri: routes.api.employee.leaveStock.index.url,
        params: Str.decamelizeKeys(params),
      });

      const leaveStocks = response.data.body.leaveStocks as LeaveStockTableDbType[];
      setLeaveStocks(prevState => leaveStocks);
    } catch (error) {
      EmployeeAxios.showErrors(error);
    }
  }, [ auth, condition ]);

  return {
    leaveStocks,
    getLeaveStocks,
    condition,
    setCondition,
  };
};

export { useIndex };
