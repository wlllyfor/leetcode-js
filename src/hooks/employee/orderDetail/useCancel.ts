"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    orderDetail: OrderDetailDbTableType;
  };
}

export type OrderDetailForCancelType = {
  checkedIdList: number[];
  orderStatus?: string;
};

const useCancel = (): {
  cancelOrderDetail: () => void;
  orderDetailForCancel: OrderDetailForCancelType;
  setOrderDetailForCancel: Dispatch<SetStateAction<OrderDetailForCancelType>>;
  isCanceled: boolean;
  setIsCanceled: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const [ orderDetailForCancel, setOrderDetailForCancel ] = useState<OrderDetailForCancelType>({
    checkedIdList: [],
    orderStatus: undefined,
  });

  const auth = useRecoilValue(EmployeeState);

  const [ isCanceled, setIsCanceled ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const cancelOrderDetail = async (): Promise<void> => {
    if (orderDetailForCancel) {
      EmployeeAxios._setToken(auth);
      setValidationErrors(prevState => []);

      const body = {
        orderStatus: orderDetailForCancel.orderStatus || null,
        orderDetails: orderDetailForCancel.checkedIdList.map(checkedId => {
          return {
            id: checkedId,
          };
        }),
      };

      try {
        await EmployeeAxios.put<ApiResponse>({
          uri: routes.api.employee.orderDetail.cancel.url,
          body: Str.decamelizeKeys(body),
        });

        setIsCanceled(prevState => true);
        toast.success("キャンセルに成功しました");
      } catch (error) {
        EmployeeAxios.showErrors(error);
        const validationErrors = EmployeeAxios.get422Errors(error);
        setValidationErrors(prevState => validationErrors);
        toast.error("入力内容に不備があります。");
      }
    }
  };

  return {
    cancelOrderDetail,
    orderDetailForCancel,
    setOrderDetailForCancel,
    isCanceled,
    setIsCanceled,
    validationErrors,
    setValidationErrors,
  };
};

export { useCancel };
