"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes, setIdPathParam } from "@/routes";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";

interface ApiResponse {
  body: {
    orderDetail: OrderDetailDbTableType;
  };
}

export type OrderDetailForDestroyType = {
  id: number | null;
};

const useDestroy = (): {
  destroyOrderDetail: () => void;
  orderDetailForDestroy: OrderDetailForDestroyType;
  setOrderDetailForDestroy: Dispatch<SetStateAction<OrderDetailForDestroyType>>;
  isDestroyed: boolean;
  setIsDestroyed: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const [ orderDetailForDestroy, setOrderDetailForDestroy ] = useState<OrderDetailForDestroyType>({
    id: null,
  });

  const auth = useRecoilValue(EmployeeState);

  const [ isDestroyed, setIsDestroyed ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const destroyOrderDetail = async (): Promise<void> => {
    if (orderDetailForDestroy) {
      EmployeeAxios._setToken(auth);

      const uri = setIdPathParam(orderDetailForDestroy.id, routes.api.employee.orderDetail.destroy.url);
      try {
        await EmployeeAxios.delete<ApiResponse>({
          uri: uri,
        });

        setIsDestroyed(prevState => true);
        toast.success("削除に成功しました");
      } catch (error) {
        EmployeeAxios.showErrors(error);
        const validationErrors = EmployeeAxios.get422Errors(error);
        setValidationErrors(prevState => validationErrors);
        toast.error("入力内容に不備があります。");
      }
    }
  };

  return {
    destroyOrderDetail,
    orderDetailForDestroy,
    setOrderDetailForDestroy,
    isDestroyed,
    setIsDestroyed,
    validationErrors,
    setValidationErrors,
  };
};

export { useDestroy };
