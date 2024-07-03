// ph2では削除

"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    orderDetail: OrderDetailDbTableType;
  };
}

export type OrderDetailForBulkUpdateType = {
  checkedIdList: number[];
  trackingNo: string;
  statusOption: ReactSelectOption | null;
  publicRemarks: string;
  publicRemarksFile: File | null;
  privateRemarks: string;
  privateRemarksFile: File | null;
};

const useBulkUpdate = (): {
  putOrderDetail: () => void;
  orderDetailForUpdate: OrderDetailForBulkUpdateType;
  setOrderDetailForUpdate: Dispatch<SetStateAction<OrderDetailForBulkUpdateType>>;
  isUpdated: boolean;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const [ orderDetailForUpdate, setOrderDetailForUpdate ] = useState<OrderDetailForBulkUpdateType>({
    checkedIdList: [],
    trackingNo: "",
    statusOption: null,
    publicRemarks: "",
    publicRemarksFile: null,
    privateRemarks: "",
    privateRemarksFile: null,
  });

  const auth = useRecoilValue(EmployeeState);

  const [ isUpdated, setIsUpdated ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const putOrderDetail = async (): Promise<void> => {
    await (async (): Promise<void> => {
      if (orderDetailForUpdate) {
        EmployeeAxios._setToken(auth);
        setValidationErrors(prevState => []);

        const body = {
          trackingNo: orderDetailForUpdate.trackingNo,
          orderStatus: orderDetailForUpdate.statusOption?.value,
          publicRemarks: orderDetailForUpdate.publicRemarks,
          publicRemarksFile: orderDetailForUpdate.publicRemarksFile,
          privateRemarks: orderDetailForUpdate.privateRemarks,
          privateRemarksFile: orderDetailForUpdate.privateRemarksFile,
          orderDetailIdList: orderDetailForUpdate?.checkedIdList.map(checkedId => {
            return {
              id: checkedId,
            };
          }),
        };

        try {
          await EmployeeAxios.put<ApiResponse>({
            isMultiPart: true,
            uri: routes.api.employee.orderDetail.updateBulk.url,
            body: Str.decamelizeKeys(body),
          });

          setIsUpdated(prevState => true);
          toast.success("登録に成功しました");
        } catch (error) {
          EmployeeAxios.showErrors(error);
          const validationErrors = EmployeeAxios.get422Errors(error);
          setValidationErrors(prevState => validationErrors);
          toast.error("入力内容に不備があります。");
        }
      }
    })();
  };

  return {
    putOrderDetail,
    orderDetailForUpdate,
    setOrderDetailForUpdate,
    isUpdated,
    setIsUpdated,
    validationErrors,
    setValidationErrors,
  };
};

export { useBulkUpdate };
