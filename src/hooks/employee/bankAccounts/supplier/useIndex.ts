"use client";

import EmployeeAxios from "@/lib/axios/employee-axios";
import { routes } from "@/routes";
import type { SupplierDbTableType } from "@/types/db/bankAccounts/SupplierDbTableType";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { useCallback, useState } from "react";

interface ApiResponse {
  body: {
    suppliers: SupplierDbTableType[];
  };
}

export const useIndex = (): {
  suppliers: SupplierDbTableType[];
  getSuppliers: () => Promise<void>;
  options: ReactSelectOption[];
} => {
  const [ suppliers, setSuppliers ] = useState<SupplierDbTableType[]>([]);
  const [ options, setOptions ] = useState<ReactSelectOption[]>([]);

  const getSuppliers = useCallback(async (): Promise<void> => {
    try {
      const response = await EmployeeAxios.get<ApiResponse>({
        uri: routes.api.employee.supplier.index.url,
      });

      const results = response.data.body.suppliers as SupplierDbTableType[];
      setSuppliers(prevState => results);
      setOptions(prevState => {
        if(!results) {
          return prevState;
        }
        return results.map(supplier => {
          return {
            value: supplier.id,
            label: supplier.name,
          };
        });
      });
    } catch (error) {
      EmployeeAxios.showErrors(error);
    }
  }, []);
  return { suppliers, getSuppliers, options };
};
