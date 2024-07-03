"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes, setIdPathParam } from "@/routes";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    leaveStock: LeaveStockTableDbType;
  };
}

export type CommissionType = {
  uuid: string;
  name: string;
  price: number;
  quantity: number;
};

export type PackingType = {
  uuid: string;
  weight: number;
  height: number;
  width: number;
  depth: number;
  boxesQuantity: number;
  postage: number;
};

export type LeaveStockForUpdateType = {
  id: number | null;
  trackingNo: string | null;
  packages: PackingType[];
  leaveStockStatusOption: ReactSelectOption | null;
  publicRemarks: string | null;
  publicRemarksFile: File | null;
  privateRemarks: string | null;
  privateRemarksFile: File | null;
  commissions: CommissionType[];
};

export const defaultLeaveStockForUpdateType: LeaveStockForUpdateType = {
  id: null,
  trackingNo: null,
  packages: [],
  leaveStockStatusOption: null,
  publicRemarks: null,
  publicRemarksFile: null,
  privateRemarks: null,
  privateRemarksFile: null,
  commissions: [],
};

const useUpdate = (): {
  updateLeaveStock: () => Promise<void>;
  leaveStockForUpdate: LeaveStockForUpdateType;
  setLeaveStockForUpdate: Dispatch<SetStateAction<LeaveStockForUpdateType>>;
  isUpdated: boolean;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(EmployeeState);

  const [ leaveStockForUpdate, setLeaveStockForUpdate ] =
    useState<LeaveStockForUpdateType>(defaultLeaveStockForUpdateType);

  const [ isUpdated, setIsUpdated ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const updateLeaveStock = async (): Promise<void> => {
    if (!leaveStockForUpdate) {
      return;
    }
    EmployeeAxios._setToken(auth);
    setValidationErrors(prevState => []);
    try {
      const uri = setIdPathParam(leaveStockForUpdate.id, routes.api.employee.leaveStock.update.url);
      const body = {
        onlyStatus: 0,
        id: leaveStockForUpdate.id,
        trackingNo: leaveStockForUpdate.trackingNo,
        packages: leaveStockForUpdate?.packages.map(pack => {
          return {
            weight: pack.weight,
            height: pack.height,
            width: pack.width,
            depth: pack.depth,
            boxesQuantity: pack.boxesQuantity,
            postage: pack.postage,
          };
        }),
        leaveStockStatus: leaveStockForUpdate.leaveStockStatusOption?.value,
        publicRemarks: leaveStockForUpdate.publicRemarks,
        publicRemarksFile: leaveStockForUpdate.publicRemarksFile,
        privateRemarks: leaveStockForUpdate.privateRemarks,
        privateRemarksFile: leaveStockForUpdate.privateRemarksFile,
        commissions: leaveStockForUpdate?.commissions.map(commission => {
          return {
            name: commission.name,
            price: commission.price,
            quantity: commission.quantity,
          };
        }),
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
    updateLeaveStock,
    leaveStockForUpdate,
    setLeaveStockForUpdate,
    isUpdated,
    setIsUpdated,
    validationErrors,
    setValidationErrors,
  };
};

export { useUpdate };
