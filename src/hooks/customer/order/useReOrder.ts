"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { toast } from "react-toastify";
import { OrderTypeDbType } from "@/types/db/order/order";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    order: OrderTypeDbType;
  };
}

const useReOrder = (): {
  postReOrder: () => Promise<void>;
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

  const postReOrder = async (): Promise<void> => {
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
        uri: routes.api.customer.order.reOrder.url,
        body: Str.decamelizeKeys(body),
      });

      setIsStored(prevState => true);
      toast.success("登録に成功しました");
    } catch (error) {
      CustomerAxios.showErrors(error);
      const validationErrors = CustomerAxios.get422Errors(error);
      setValidationErrors(prevState => validationErrors);
      toast.error("入力内容に不備があります。");
    }
  };

  return {
    postReOrder,
    srcIdList,
    setSrcIdList,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
  };
};

export { useReOrder };
