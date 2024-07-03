"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { Str } from "@/lib/Str";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { ReactSelectInspectOption } from "@/types/reactSelectOptions/ReactSelectInspectOption";

interface ApiResponse {
  body: {
    receiveStock: ReceiveStockDbTableType;
  };
}

export type ReceiveStockForInspectType = {
  receiveStocksDetailOption: ReactSelectInspectOption | null;
  productOption: ReactSelectOption | null;
  id: number | null;
  quantity: number;
  height: number;
  width: number;
  depth: number;
};

const useInspect = (): {
  inspectReceiveStock: () => Promise<void>;
  receiveStockForInspect: ReceiveStockForInspectType;
  setReceiveStockForInspect: Dispatch<SetStateAction<ReceiveStockForInspectType>>;
  isInspected: boolean;
  setIsInspected: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(EmployeeState);

  const [ receiveStockForInspect, setReceiveStockForInspect ] = useState<ReceiveStockForInspectType>({
    receiveStocksDetailOption: null,
    productOption: null,
    id: null,
    quantity: 0,
    height: 0,
    width: 0,
    depth: 0,
  });

  const [ isInspected, setIsInspected ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const inspectReceiveStock = async (): Promise<void> => {
    if (!receiveStockForInspect) {
      return;
    }
    EmployeeAxios._setToken(auth);
    setValidationErrors(prevState => []);
    try {
      const body = {
        id: receiveStockForInspect.receiveStocksDetailOption?.receiveStockDetail?.id,
        quantity: receiveStockForInspect.quantity,
        height: receiveStockForInspect.height,
        width: receiveStockForInspect.width,
        depth: receiveStockForInspect.depth,
      };

      await EmployeeAxios.put<ApiResponse>({
        uri: routes.api.employee.receiveStock.inspect.url,
        body: Str.decamelizeKeys(body),
      });

      await setIsInspected(prevState => true);
      toast.success("更新に成功しました");
    } catch (error) {
      EmployeeAxios.showErrors(error);
      const validationErrors = EmployeeAxios.get422Errors(error);
      await setValidationErrors(prevState => validationErrors);
      toast.error("入力内容に不備があります。");
    }
  };

  return {
    inspectReceiveStock,
    receiveStockForInspect,
    setReceiveStockForInspect,
    isInspected,
    setIsInspected,
    validationErrors,
    setValidationErrors,
  };
};

export { useInspect };
