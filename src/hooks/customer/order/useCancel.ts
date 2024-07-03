"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { toast } from "react-toastify";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    orderDetails: OrderDetailDbTableType[];
  };
}

const useCancel = (): {
  postCancel: () => Promise<void>;
  srcIdList: number[];
  setSrcIdList: Dispatch<SetStateAction<number[]>>;
  isStored: boolean;
  setIsStored: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(CustomerState);

  const [ isStored, setIsStored ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const [ srcIdList, setSrcIdList ] = useState<number[]>([]);

  const postCancel = async (): Promise<void> => {
    CustomerAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      orderDetails: srcIdList.map(id => {
        return {
          id: id,
        };
      }),
    };

    try {
      await CustomerAxios.post<ApiResponse>({
        uri: routes.api.customer.order.cancel.url,
        body: Str.decamelizeKeys(body),
      });

      setIsStored(prevState => true);
      toast.success("キャンセル依頼に成功しました");
    } catch (error) {
      CustomerAxios.showErrors(error);
      const validationErrors = CustomerAxios.get422Errors(error);
      setValidationErrors(prevState => validationErrors);
      toast.error("入力内容に不備があります。");
    }
  };

  return {
    postCancel,
    srcIdList,
    setSrcIdList,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
  };
};

export { useCancel };
