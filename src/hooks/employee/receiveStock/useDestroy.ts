"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes, setIdPathParam } from "@/routes";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";

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
  const auth = useRecoilValue(EmployeeState);

  const [ isDestroyed, setIsDestroyed ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const destroyReceiveStock = async (id: number | null): Promise<void> => {
    if (id === null) {
      setIsDestroyed(prevState => false);
      return;
    }
    await (async (): Promise<void> => {
      EmployeeAxios._setToken(auth);
      setValidationErrors(prevState => []);

      const uri = setIdPathParam(id, routes.api.employee.receiveStock.destroy.url);
      try {
        await EmployeeAxios.delete<ApiResponse>({
          uri: uri,
          body: {
            id: id,
          },
        });

        setIsDestroyed(prevState => true);
        toast.success("削除に成功しました");
      } catch (error) {
        EmployeeAxios.showErrors(error);
        const validationErrors = EmployeeAxios.get422Errors(error);
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
