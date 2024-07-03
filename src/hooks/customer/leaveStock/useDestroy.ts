"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes, setIdPathParam } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { toast } from "react-toastify";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";

interface ApiResponse {
  body: {
    leaveStock: LeaveStockTableDbType;
  };
}

const useDestroy = (): {
  destroyLeaveStock: (id: number) => Promise<void>;
  isDestroyed: boolean;
  setIsDestroyed: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(CustomerState);

  const [ isDestroyed, setIsDestroyed ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const destroyLeaveStock = async (id: number): Promise<void> => {
    await (async (): Promise<void> => {
      CustomerAxios._setToken(auth);
      setValidationErrors(prevState => []);

      const uri = setIdPathParam(id, routes.api.customer.leaveStock.destroy.url);
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
    destroyLeaveStock,
    isDestroyed,
    setIsDestroyed,
    validationErrors,
    setValidationErrors,
  };
};

export { useDestroy };
