"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { Str } from "@/lib/Str";
import { EmployeeCartDbType } from "@/types/db/employeeCart";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

interface ApiResponse {
  body: {
    employeeCarts: EmployeeCartDbType[];
  };
}

export type EmployeeCartIndexConditionType = {
  orderStatusOptions: ReactSelectOption[];
  hubOptions: ReactSelectOption[];
  groupOptions: ReactSelectOption[];
  employeeOptions: ReactSelectOption[];
  orderId: string;
  customerId: string;
};

const useIndex = (): {
  employeeCarts: EmployeeCartDbType[];
  setEmployeeCarts: Dispatch<SetStateAction<EmployeeCartDbType[]>>;
  getEmployeeCarts: () => Promise<void>;
  condition: EmployeeCartIndexConditionType;
  setCondition: Dispatch<SetStateAction<EmployeeCartIndexConditionType>>;
} => {
  const auth = useRecoilValue(EmployeeState);
  const [ employeeCarts, setEmployeeCarts ] = useState<EmployeeCartDbType[]>([]);

  // 検索条件
  const [ condition, setCondition ] = useState<EmployeeCartIndexConditionType>({
    orderStatusOptions: [],
    hubOptions: [],
    groupOptions: [],
    employeeOptions: [],
    orderId: "",
    customerId: "",
  });

  const getEmployeeCarts = useCallback(async (): Promise<void> => {
    EmployeeAxios._setToken(auth);

    const params = {
      orderStatus: condition.orderStatusOptions.map(item => item.value).join(","),
      hubIdList: condition.hubOptions.map(item => item.value).join(","),
      groupIdList: condition.groupOptions.map(item => item.value).join(","),
      employeeIdList: condition.employeeOptions.map(item => item.value).join(","),
      orderId: condition.orderId,
      customerId: condition.customerId,
    };

    try {
      const response = await EmployeeAxios.get<ApiResponse>({
        uri: routes.api.employee.employeeCart.index.url,
        params: Str.decamelizeKeys(params),
      });

      const employeeCarts = response.data.body.employeeCarts as EmployeeCartDbType[];
      setEmployeeCarts(prevState => employeeCarts);
    } catch (error) {
      EmployeeAxios.showErrors(error);
    }
  }, [ auth, condition ]);

  return {
    employeeCarts,
    setEmployeeCarts,
    getEmployeeCarts,
    condition,
    setCondition,
  };
};

export { useIndex };
