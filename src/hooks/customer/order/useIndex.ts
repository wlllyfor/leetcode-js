"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    orderDetails: OrderDetailDbTableType[];
  };
}

const useIndex = (): {
  orderDetails: OrderDetailDbTableType[];
  setOrderDetails: Dispatch<SetStateAction<OrderDetailDbTableType[]>>;
  getOrderDetails: () => Promise<void | OrderDetailDbTableType[]>;
  orderStatuses: ReactSelectOption[];
  setOrderStatuses: Dispatch<SetStateAction<ReactSelectOption[]>>;
  orderCode: string;
  setOrderCode: Dispatch<SetStateAction<string>>;
  sku: string;
  setSku: Dispatch<SetStateAction<string>>;
  orderedOnFrom: string;
  setOrderedOnFrom: Dispatch<SetStateAction<string>>;
  orderedOnTo: string;
  setOrderedOnTo: Dispatch<SetStateAction<string>>;
  orderSort: ReactSelectOption | null;
  setOrderSort: Dispatch<SetStateAction<ReactSelectOption | null>>;
} => {
  const auth = useRecoilValue(CustomerState);
  const [ orderDetails, setOrderDetails ] = useState<OrderDetailDbTableType[]>([]);

  // 検索条件
  const [ sku, setSku ] = useState<string>("");
  const [ orderCode, setOrderCode ] = useState<string>("");
  const [ orderedOnFrom, setOrderedOnFrom ] = useState<string>("");
  const [ orderedOnTo, setOrderedOnTo ] = useState<string>("");
  const [ orderStatuses, setOrderStatuses ] = useState<ReactSelectOption[]>([]);
  const [ orderSort, setOrderSort ] = useState<ReactSelectOption | null>(null);

  const getOrderDetails = useCallback(async (): Promise<void | OrderDetailDbTableType[]> => {
    CustomerAxios._setToken(auth);
    const orderStatusValues = orderStatuses.map(status => status.value).join(",");
    const params = {
      orderStatuses: orderStatusValues,
      orderCode: orderCode,
      sku: sku,
      orderedOnFrom: orderedOnFrom,
      orderedOnTo: orderedOnTo,
      orderSort: orderSort?.value,
    };

    try {
      const response = await CustomerAxios.get<ApiResponse>({
        uri: routes.api.customer.order.index.url,
        params: Str.decamelizeKeys(params),
      });

      const orderDetails = response.data.body.orderDetails as OrderDetailDbTableType[];
      setOrderDetails(prevState => orderDetails);
      return orderDetails;
    } catch (error) {
      CustomerAxios.showErrors(error);
    }
  }, [ auth, orderStatuses, orderCode, sku, orderedOnFrom, orderedOnTo, orderSort ]);

  return {
    orderDetails,
    setOrderDetails,
    getOrderDetails,
    orderStatuses,
    setOrderStatuses,
    orderCode,
    setOrderCode,
    sku,
    setSku,
    orderedOnFrom,
    setOrderedOnFrom,
    orderedOnTo,
    setOrderedOnTo,
    orderSort,
    setOrderSort,
  };
};

export { useIndex };
