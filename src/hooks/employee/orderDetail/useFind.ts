"use client";

import { useCallback, useState } from "react";
import { routes, setIdPathParam } from "@/routes";
import { useRecoilValue } from "recoil";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";

interface ApiResponse {
  body: {
    orderDetail: OrderDetailDbTableType;
  };
}

const useFind = (): {
  orderDetail: OrderDetailDbTableType | null;
  getOrderDetail: (id: number) => Promise<void>;
} => {
  const auth = useRecoilValue(EmployeeState);
  const [ orderDetail, setOrderDetail ] = useState<OrderDetailDbTableType | null>(null);

  const getOrderDetail = useCallback(
    async (id: number): Promise<void> => {
      EmployeeAxios._setToken(auth);
      try {
        const response = await EmployeeAxios.get<ApiResponse>({
          uri: setIdPathParam(id, routes.api.employee.orderDetail.find.url),
        });

        const orderDetail = response.data.body.orderDetail as OrderDetailDbTableType;
        setOrderDetail(prevState => orderDetail);
      } catch (error) {
        EmployeeAxios.showErrors(error);
      }
    },
    [ auth ],
  );

  return {
    orderDetail,
    getOrderDetail,
  };
};

export { useFind };
