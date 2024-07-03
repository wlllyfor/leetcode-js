"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { enumOrderSort } from "@/types/enum/enumOrderSort";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    orderDetails: OrderDetailDbTableType[];
  };
}

type OrderIndexConditionType = {
  orderStatusOptions: ReactSelectOption[];
  hubOptions: ReactSelectOption[];
  createStockOptions: ReactSelectOption[];
  groupOptions: ReactSelectOption[];
  employeeOptions: ReactSelectOption[];
  debitOptions: ReactSelectOption[];
  orderId: number | null;
  orderSort?: ReactSelectOption;
};
const useIndex = (): {
  orderDetails: OrderDetailDbTableType[];
  getOrderDetails: () => Promise<void>;
  condition: OrderIndexConditionType;
  setCondition: Dispatch<SetStateAction<OrderIndexConditionType>>;
} => {
  const auth = useRecoilValue(EmployeeState);
  const [ orderDetails, setOrderDetails ] = useState<OrderDetailDbTableType[]>([]);

  // 検索条件
  const [ condition, setCondition ] = useState<OrderIndexConditionType>({
    orderStatusOptions: [],
    hubOptions: [],
    createStockOptions: [],
    groupOptions: [],
    employeeOptions: [],
    debitOptions: [],
    orderId: null,
    orderSort: {
      value: "created_at_desc",
      label: enumOrderSort.createdAtDesc,
    },
  });

  const getOrderDetails = useCallback(async (): Promise<void> => {
    EmployeeAxios._setToken(auth);

    const orderStatusValues = condition.orderStatusOptions.map(item => item.value).join(",");
    const hubIdListValues = condition.hubOptions.map(item => item.value).join(",");
    const createStockStatusValues = condition.createStockOptions.map(item => item.value).join(",");
    const groupIdListValues = condition.groupOptions.map(item => item.value).join(",");
    const employeeIdListValues = condition.employeeOptions.map(item => item.value).join(",");
    const debitStatusValues = condition.employeeOptions.map(item => item.value).join(",");
    const params = {
      orderStatuses: orderStatusValues,
      hubIdList: hubIdListValues,
      createStockStatusValues: createStockStatusValues,
      groupIdList: groupIdListValues,
      employeeIdList: employeeIdListValues,
      debitStatusValues: debitStatusValues,
      customerId: condition.orderId,
      orderSort: condition.orderSort?.value,
    };
    try {
      const response = await EmployeeAxios.get<ApiResponse>({
        uri: routes.api.employee.orderDetail.index.url,
        params: Str.decamelizeKeys(params),
      });

      const orderDetails = response.data.body.orderDetails as OrderDetailDbTableType[];
      setOrderDetails(prevState => orderDetails);
    } catch (error) {
      EmployeeAxios.showErrors(error);
    }
  }, [ auth, condition ]);

  return {
    orderDetails,
    getOrderDetails,
    condition,
    setCondition,
  };
};

export { useIndex };
