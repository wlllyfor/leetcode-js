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

export type TaxForUpdateType = {
  id: number | null;
  name: string;
  startedOn: string;
  rate: number;
  hubName: string;
};

export const defaultTaxForPostType: TaxForUpdateType = {
  id: null,
  name: "",
  startedOn: "",
  rate: 0,
  hubName: "",
};

const useUpdate = (): {
  updateTax: () => Promise<void>;
  taxForUpdate: TaxForUpdateType;
  setTaxForUpdate: Dispatch<SetStateAction<TaxForUpdateType>>;
  isLoading: boolean;
  isUpdated: boolean;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(EmployeeState);

  const [ taxForUpdate, setTaxForUpdate ] = useState<TaxForUpdateType>(defaultTaxForPostType);

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isUpdated, setIsUpdated ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const updateTax = async (): Promise<void> => {
    if (!taxForUpdate) {
      return;
    }
    EmployeeAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      id: taxForUpdate.id,
      name: taxForUpdate.name,
      startedOn: taxForUpdate.startedOn,
      rate: taxForUpdate.rate,
    };

    try {
      setIsLoading(true);
      await EmployeeAxios.put<ApiResponse>({
        uri: routes.api.employee.tax.update.url,
        isMultiPart: false,
        body: Str.decamelizeKeys(body),
      });

      setIsUpdated(prevState => true);
      toast.success("登録に成功しました");
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
    updateTax,
    taxForUpdate,
    setTaxForUpdate,
    isLoading,
    isUpdated,
    setIsUpdated,
    validationErrors,
    setValidationErrors,
  };
};

export { useUpdate };
