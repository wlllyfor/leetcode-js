"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { Str } from "@/lib/Str";
import { CustomerDbTableType } from "@/types/db/customer";

interface ApiResponse {
  body: {
    customers: CustomerDbTableType[];
  };
}

export type CustomerIndexConditionType = {
  hubOptions: ReactSelectOption[];
  customerStatusOptions: ReactSelectOption[];
  customerOptions: ReactSelectOption[];
  dedicatedAccountText: string | null; // 専用口座
  name: string | null;
  kana: string | null;
  planOptions: ReactSelectOption[];
  employeeOptions: ReactSelectOption[];
  email: string | null;
  chatWorkId: string | null;
  chatWorkGroupId: string | null;
  companyName: string | null;
  tel: string | null;
};
const useIndex = (): {
  customers: CustomerDbTableType[];
  getCustomers: () => Promise<void>;
  condition: CustomerIndexConditionType;
  setCondition: Dispatch<SetStateAction<CustomerIndexConditionType>>;
  getCustomerOptions: () => Promise<void>;
  customerOptions: ReactSelectOption[];
} => {
  const auth = useRecoilValue(EmployeeState);
  const [ customers, setCustomers ] = useState<CustomerDbTableType[]>([]);
  const [ customerOptions, setCustomerOptions ] = useState<ReactSelectOption[]>([]);

  // 検索条件
  const [ condition, setCondition ] = useState<CustomerIndexConditionType>({
    hubOptions: [],
    customerStatusOptions: [],
    customerOptions: [],
    dedicatedAccountText: null,
    name: null,
    kana: null,
    planOptions: [],
    employeeOptions: [],
    email: null,
    chatWorkId: null,
    chatWorkGroupId: null,
    companyName: null,
    tel: null,
  });

  const getCustomers = useCallback(async (): Promise<void> => {
    EmployeeAxios._setToken(auth);

    const hubIdListValues = condition.hubOptions.map(item => item.value).join(",");
    const customerStatusValues = condition.customerStatusOptions.map(item => item.value).join(",");
    const customerValues = condition.customerOptions.map(item => item.value).join(",");
    const planIdListValues = condition.planOptions.map(item => item.value).join(",");
    const employeeIdListValues = condition.employeeOptions.map(item => item.value).join(",");
    const params = {
      hubIdList: hubIdListValues,
      customerStatusIdList: customerStatusValues,
      customerIdList: customerValues,
      dedicatedAccountText: condition.dedicatedAccountText,
      name: condition.name,
      kana: condition.kana,
      planIdList: planIdListValues,
      employeeIdList: employeeIdListValues,
      email: condition.email,
      chatWorkId: condition.chatWorkId,
      chatWorkGroupId: condition.chatWorkGroupId,
      companyName: condition.companyName,
      tel: condition.tel,
    };
    try {
      const response = await EmployeeAxios.get<ApiResponse>({
        uri: routes.api.employee.customer.index.url,
        params: Str.decamelizeKeys(params),
      });

      const customers = response.data.body.customers as CustomerDbTableType[];
      setCustomers(prevState => customers);
    } catch (error) {
      EmployeeAxios.showErrors(error);
    }
  }, [ auth, condition ]);

  const getCustomerOptions = useCallback(async (): Promise<void> => {
    EmployeeAxios._setToken(auth);

    try {
      const response = await EmployeeAxios.get<ApiResponse>({
        uri: routes.api.employee.customer.index.url,
      });

      const customers = response.data.body.customers as CustomerDbTableType[];
      setCustomerOptions(prevState => {
        return customers.map(customer => {
          return {
            value: customer.id,
            label: `YP-${customer.id}`,
          } as ReactSelectOption;
        });
      });
    } catch (error) {
      /* empty */
    }
  }, [ auth ]);

  return {
    customers,
    getCustomers,
    condition,
    setCondition,
    getCustomerOptions,
    customerOptions,
  };
};

export { useIndex };
