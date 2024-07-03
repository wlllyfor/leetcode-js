"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { Str } from "@/lib/Str";
import { TaxDbTableType } from "@/types/db/tax";

interface ApiResponse {
  body: {
    tax: TaxDbTableType;
  };
}

export type TaxForDestroyType = {
  id: number | null;
};

export const defaultTaxForPostType: TaxForDestroyType = {
  id: null,
};

const useDestroy = (): {
  destroyTax: () => Promise<void>;
  taxForDestroy: TaxForDestroyType;
  setTaxForDestroy: Dispatch<SetStateAction<TaxForDestroyType>>;
  isLoading: boolean;
  isDestroyed: boolean;
  setIsDestroyed: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(EmployeeState);

  const [ taxForDestroy, setTaxForDestroy ] = useState<TaxForDestroyType>(defaultTaxForPostType);

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isDestroyed, setIsDestroyed ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const destroyTax = async (): Promise<void> => {
    if (!taxForDestroy) {
      return;
    }
    EmployeeAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      id: taxForDestroy.id,
    };

    try {
      setIsLoading(true);
      await EmployeeAxios.delete<ApiResponse>({
        uri: routes.api.employee.tax.delete.url,
        body: Str.decamelizeKeys(body),
      });

      setIsDestroyed(prevState => true);
      toast.success("削除に成功しました");
    } catch (error) {
      EmployeeAxios.showErrors(error);
      const validationErrors = EmployeeAxios.get422Errors(error);
      setValidationErrors(prevState => validationErrors);
      toast.error("入力内容に不備があります。");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    destroyTax,
    taxForDestroy,
    setTaxForDestroy,
    isLoading,
    isDestroyed,
    setIsDestroyed,
    validationErrors,
    setValidationErrors,
  };
};

export { useDestroy };
