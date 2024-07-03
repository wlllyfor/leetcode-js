"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { Str } from "@/lib/Str";
import { LeaveStockProductDbTableType } from "@/types/db/leaveStock/leaveStockProduct";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { Integer } from "@/lib/integer";

interface ApiResponse {
  body: {
    leaveStockProducts: LeaveStockProductDbTableType;
  };
}

export type LeaveStockForLeaveType = {
  leaveStockId: number | null;
  productOption: ReactSelectOption | null;
  leaveQuantity: number;
  barCode: string | null;
};

export const defaultLeaveStockForUpdateType: LeaveStockForLeaveType = {
  leaveStockId: null,
  productOption: null,
  leaveQuantity: 0,
  barCode: null,
};

const useLeave = (): {
  leaveStock: (isBarcode: boolean) => Promise<void>;
  leaveStockForLeave: LeaveStockForLeaveType;
  setLeaveStockForLeave: Dispatch<SetStateAction<LeaveStockForLeaveType>>;
  isLeaved: boolean;
  setIsLeaved: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(EmployeeState);

  const [ leaveStockForLeave, setLeaveStockForLeave ] = useState<LeaveStockForLeaveType>(defaultLeaveStockForUpdateType);

  const [ isLeaved, setIsLeaved ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const leaveStock = async (isBarcode: boolean): Promise<void> => {
    if (!leaveStockForLeave) {
      return;
    }
    EmployeeAxios._setToken(auth);
    setValidationErrors(prevState => []);
    try {
      const body = {
        isBarcode: Integer.boolToInteger(isBarcode),
        leaveStockId: leaveStockForLeave.leaveStockId,
        productId: leaveStockForLeave.productOption?.value,
        leaveQuantity: isBarcode ? 1 : leaveStockForLeave.leaveQuantity, // バーコードなら1商品ずつ
        barcode: leaveStockForLeave.barCode,
      };
      await EmployeeAxios.put<ApiResponse>({
        uri: routes.api.employee.leaveStock.leave.url,
        body: Str.decamelizeKeys(body),
      });

      setIsLeaved(prevState => true);
      toast.success("更新に成功しました");
    } catch (error) {
      EmployeeAxios.showErrors(error);
      const validationErrors = EmployeeAxios.get422Errors(error);
      setValidationErrors(prevState => validationErrors);
      toast.error("入力内容に不備があります。");
    }
  };

  return {
    leaveStock,
    leaveStockForLeave,
    setLeaveStockForLeave,
    isLeaved,
    setIsLeaved,
    validationErrors,
    setValidationErrors,
  };
};

export { useLeave };
