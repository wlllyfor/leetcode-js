"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { Str } from "@/lib/Str";
import { TaxDbTableType } from "@/types/db/tax";
import { EmployeeDbTableType } from "@/types/db/employee";

interface ApiResponse {
  body: {
    tax: TaxDbTableType;
  };
}

export type TaxForPostType = {
  name: string;
  startedOn: string;
  rate: number;
};

export const defaultTaxForPostType: TaxForPostType = {
  name: "",
  startedOn: "",
  rate: 0,
};

const useStore = (): {
  postTax: () => Promise<void>;
  taxForPost: TaxForPostType;
  setTaxForPost: Dispatch<SetStateAction<TaxForPostType>>;
  isLoading: boolean;
  isStored: boolean;
  setIsStored: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(EmployeeState);

  const [ taxForPost, setTaxForPost ] = useState<TaxForPostType>(defaultTaxForPostType);

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isStored, setIsStored ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const postTax = async (): Promise<void> => {
    if (!taxForPost) {
      return;
    }
    EmployeeAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const employee = await EmployeeAxios.getMe() as EmployeeDbTableType;

    const body = {
      name: taxForPost.name,
      startedOn: taxForPost.startedOn,
      rate: taxForPost.rate,
      hubId: employee.currentAccessHubId,
    };

    try {
      setIsLoading(true);
      await EmployeeAxios.post<ApiResponse>({
        uri: routes.api.employee.tax.store.url,
        isMultiPart: false,
        body: Str.decamelizeKeys(body),
      });

      setIsStored(prevState => true);
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
    postTax,
    taxForPost,
    setTaxForPost,
    isLoading,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
  };
};

export { useStore };
