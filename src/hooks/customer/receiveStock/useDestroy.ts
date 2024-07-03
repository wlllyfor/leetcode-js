"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes, setIdPathParam } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { toast } from "react-toastify";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";

interface ApiResponse {
  body: {
    receiveStock: ReceiveStockDbTableType;
  };
}

const useDestroy = (): {
  destroyReceiveStock: (id: number | null) => Promise<void>;
  isDestroyed: boolean;
  setIsDestroyed: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(CustomerState);

  const [ isDestroyed, setIsDestroyed ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const destroyReceiveStock = async (id: number | null): Promise<void> => {
    if (id === null) {
      setIsDestroyed(false);
      return;
    }
    await (async (): Promise<void> => {
      CustomerAxios._setToken(auth);
      setValidationErrors(prevState => []);

      const uri = setIdPathParam(id, routes.api.customer.receiveStock.destroy.url);
      try {
        await CustomerAxios.delete<ApiResponse>({
          uri: uri,
          body: {
            id: id,
          },
        });

        setIsDestroyed(true);
        toast.success("削除に成功しました");
      } catch (error) {
        CustomerAxios.showErrors(error);
        const validationErrors = CustomerAxios.get422Errors(error);
        await setValidationErrors(prevState => validationErrors);
        toast.error("入力内容に不備があります。");
      }
    })();
  };

  return {
    destroyReceiveStock,
    isDestroyed,
    setIsDestroyed,
    validationErrors,
    setValidationErrors,
  };
};

export { useDestroy };
