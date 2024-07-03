"use client";

import { EmployeeDbTableType } from "@/types/db/employee";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

interface ApiResponse {
  body: {
    employees: EmployeeDbTableType[];
  };
}

const useIndex = (): {
  employees: EmployeeDbTableType[];
  getEmployees: () => Promise<void>;
  options: ReactSelectOption[];
  setOptions: Dispatch<SetStateAction<ReactSelectOption[]>>;
} => {
  const [ employees, setEmployees ] = useState<EmployeeDbTableType[]>([]);
  const [ options, setOptions ] = useState<ReactSelectOption[]>([]);

  const getEmployees = useCallback(async (): Promise<void> => {
    try {
      const response = await GuestAxios.get<ApiResponse>({
        uri: routes.api.guest.common.employee.index.url,
      });

      const employeeTypes = response.data.body.employees as EmployeeDbTableType[];
      setEmployees(prevState => employeeTypes);

      setOptions(prevState => {
        if (!prevState || !employeeTypes) return [];
        return employeeTypes.map((employee): ReactSelectOption => {
          return {
            label: employee.name,
            value: employee.id,
          } as ReactSelectOption;
        });
      });
    } catch (error) {
      GuestAxios.showErrors(error);
    }
  }, []);

  return { employees, getEmployees, options, setOptions };
};

export { useIndex };
