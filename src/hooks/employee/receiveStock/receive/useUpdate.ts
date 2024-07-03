"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes, setIdPathParam } from "@/routes";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    receiveStock: ReceiveStockDbTableType;
  };
}

export type ReceiveStockForUpdateType = {
  id: number | null;
  customerId: number | null;
  trackingNo: string | null;
  expectedArrivedOn: string;
  statusOption: ReactSelectOption | null;
  publicRemarks: string | null;
  publicRemarksFile: File | null;
  privateRemarks: string | null;
  privateRemarksFile: File | null;
};

const useUpdate = (): {
  updateReceiveStock: () => Promise<void>;
  receiveStockForUpdate: ReceiveStockForUpdateType;
  setReceiveStockForUpdate: Dispatch<SetStateAction<ReceiveStockForUpdateType>>;
  isUpdated: boolean;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(EmployeeState);

  const [ receiveStockForUpdate, setReceiveStockForUpdate ] = useState<ReceiveStockForUpdateType>({
    id: null,
    customerId: null,
    trackingNo: "",
    expectedArrivedOn: "",
    statusOption: null,
    publicRemarks: "",
    publicRemarksFile: null,
    privateRemarks: "",
    privateRemarksFile: null,
  });

  const [ isUpdated, setIsUpdated ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const updateReceiveStock = async (): Promise<void> => {
    if (!receiveStockForUpdate) {
      return;
    }
    EmployeeAxios._setToken(auth);
    setValidationErrors(prevState => []);
    try {
      const uri = setIdPathParam(receiveStockForUpdate.id, routes.api.employee.receiveStock.update.url);

      const body = {
        id: receiveStockForUpdate.id,
        trackingNo: receiveStockForUpdate.trackingNo,
        expectedArrivedOn: receiveStockForUpdate.expectedArrivedOn,
        receiveStockStatus: receiveStockForUpdate.statusOption?.value,
        publicRemarks: receiveStockForUpdate.publicRemarks,
        publicRemarksFile: receiveStockForUpdate.publicRemarksFile,
        privateRemarks: receiveStockForUpdate.privateRemarks,
        privateRemarksFile: receiveStockForUpdate.privateRemarksFile,
        isFromReceive: 1,
      };

      await EmployeeAxios.put<ApiResponse>({
        uri: uri,
        isMultiPart: true,
        body: Str.decamelizeKeys(body),
      });

      await setIsUpdated(prevState => true);
      toast.success("更新に成功しました");
    } catch (error) {
      EmployeeAxios.showErrors(error);
      const validationErrors = EmployeeAxios.get422Errors(error);
      await setValidationErrors(prevState => validationErrors);
      toast.error("入力内容に不備があります。");
    }
  };

  return {
    updateReceiveStock,
    receiveStockForUpdate,
    setReceiveStockForUpdate,
    isUpdated,
    setIsUpdated,
    validationErrors,
    setValidationErrors,
  };
};

export { useUpdate };
