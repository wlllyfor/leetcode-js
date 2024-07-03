"use client";

import EmployeeAxios from "@/lib/axios/employee-axios";
import { routes } from "@/routes";
import type { EmployeeAccountDbTableType } from "@/types/db/bankAccounts/EmployeeAccountDbTableType";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { useCallback, useState } from "react";

interface ApiResponse {
  body: {
    employeeAccounts: EmployeeAccountDbTableType[];
  };
}

export const useIndex = (): {
  employeeAccounts: EmployeeAccountDbTableType[];
  getEmployeeAccounts: () => Promise<void>;
  options: ReactSelectOption[];
} => {
  const [ employeeAccounts, setEmployeeAccounts ] = useState<EmployeeAccountDbTableType[]>([]);
  const [ options, setOptions ] = useState<ReactSelectOption[]>([]);

  const getEmployeeAccounts = useCallback(async (): Promise<void> => {
    try {
      const response = await EmployeeAxios.get<ApiResponse>({
        uri: routes.api.employee.employeeAccount.index.url,
      });

      const results = response.data.body.employeeAccounts as EmployeeAccountDbTableType[];
      setEmployeeAccounts(prevState => results);
      setOptions(prevState => {
        if(!results) {
          return prevState;
        }
        return results.map(payment => {
          return {
            value: payment.id,
            label: payment.name,
          };
        });
      });
    } catch (error) {
      EmployeeAxios.showErrors(error);
    }
  }, []);
  return { employeeAccounts, getEmployeeAccounts, options };
};
