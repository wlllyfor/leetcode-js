"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { Str } from "@/lib/Str";
import { UUID } from "@/lib/uuid";
import { ReceiveStockDetailEntityType } from "@/types/entity/ReceiveStockDetailEntityType";

interface ApiResponse {
  body: {
    receiveStock: ReceiveStockDbTableType;
  };
}

export type ReceiveStockForReceiveType = {
  id: number | null;
  quantity: number;
  receiveStockDetailEntities: ReceiveStockDetailEntityType[];
  uuid: string;
};

const useReceive = (): {
  receiveReceiveStock: () => Promise<void>;
  receiveStockForReceive: ReceiveStockForReceiveType;
  setReceiveStockForReceive: Dispatch<SetStateAction<ReceiveStockForReceiveType>>;
  isReceived: boolean;
  setIsReceived: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(EmployeeState);

  const [ receiveStockForReceive, setReceiveStockForReceive ] = useState<ReceiveStockForReceiveType>({
    id: null,
    quantity: 0,
    uuid: UUID.generate(),
    receiveStockDetailEntities: [],
  });

  const [ isReceived, setIsReceived ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const receiveReceiveStock = async (): Promise<void> => {
    if (!receiveStockForReceive || !receiveStockForReceive.receiveStockDetailEntities) {
      return;
    }
    EmployeeAxios._setToken(auth);
    setValidationErrors(prevState => []);
    try {
      const body = {
        id: receiveStockForReceive.id,
        quantity: receiveStockForReceive.quantity,
      };

      await EmployeeAxios.put<ApiResponse>({
        uri: routes.api.employee.receiveStock.receive.url,
        body: Str.decamelizeKeys(body),
      });

      await setIsReceived(prevState => true);
      toast.success("更新に成功しました");
    } catch (error) {
      EmployeeAxios.showErrors(error);
      const validationErrors = EmployeeAxios.get422Errors(error);
      await setValidationErrors(prevState => validationErrors);
      toast.error("入力内容に不備があります。");
    }
  };

  return {
    receiveReceiveStock,
    receiveStockForReceive,
    setReceiveStockForReceive,
    isReceived,
    setIsReceived,
    validationErrors,
    setValidationErrors,
  };
};

export { useReceive };
