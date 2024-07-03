"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { toast } from "react-toastify";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    leaveStock: LeaveStockTableDbType;
  };
}

const useCancel = (): {
  postCancel: () => Promise<void>;
  srcIdList: number[];
  setSrcIdList: Dispatch<SetStateAction<number[]>>;
  isCanceled: boolean;
  setIsCanceled: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(CustomerState);

  const [ isCanceled, setIsCanceled ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const [ srcIdList, setSrcIdList ] = useState<number[]>([]);

  const postCancel = async (): Promise<void> => {
    await (async (): Promise<void> => {
      CustomerAxios._setToken(auth);
      setValidationErrors(prevState => []);

      const body = {
        leaveStocks: srcIdList.map(id => {
          return {
            id: id,
          };
        }),
      };

      try {
        await CustomerAxios.post<ApiResponse>({
          uri: routes.api.customer.leaveStock.cancel.url,
          body: Str.decamelizeKeys(body),
        });

        setIsCanceled(true);
        toast.success("キャンセル依頼に成功しました");
      } catch (error) {
        CustomerAxios.showErrors(error);
        const validationErrors = CustomerAxios.get422Errors(error);
        setValidationErrors(prevState => validationErrors);
        toast.error("入力内容に不備があります。");
      }
    })();
  };

  return {
    postCancel,
    isCanceled,
    setIsCanceled,
    validationErrors,
    setValidationErrors,
    srcIdList,
    setSrcIdList,
  };
};

export { useCancel };
