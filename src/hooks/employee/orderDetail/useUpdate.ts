"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes, setIdPathParam } from "@/routes";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";
import { UUID } from "@/lib/uuid";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    orderDetail: OrderDetailDbTableType;
  };
}

export type OtherPriceType = {
  uuid: string;
  name: string;
  price: number;
};

export type OrderDetailForUpdateType = {
  id: number | null;
  trackingNo: string;
  statusOption: ReactSelectOption | null;
  name: string;
  variation: string;
  shopName: string;
  productFile: File | null;
  quantity: number;
  productUrl: string;
  mallOption: ReactSelectOption | null;
  postage: number;
  otherPrices: OtherPriceType[];
  publicRemarks: string;
  publicRemarksFile: File | null;
  privateRemarks: string;
  privateRemarksFile: File | null;
};

const useUpdate = (): {
  putOrderDetail: () => void;
  orderDetailForUpdate: OrderDetailForUpdateType;
  setOrderDetailForUpdate: Dispatch<SetStateAction<OrderDetailForUpdateType>>;
  isUpdated: boolean;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const [ orderDetailForUpdate, setOrderDetailForUpdate ] = useState<OrderDetailForUpdateType>({
    id: null,
    trackingNo: "",
    statusOption: null,
    name: "",
    variation: "",
    shopName: "",
    productFile: null,
    quantity: 1,
    productUrl: "",
    mallOption: null,
    postage: 0,
    otherPrices: [
      {
        uuid: UUID.generate(),
        price: 0,
        name: "",
      },
    ],
    publicRemarks: "",
    publicRemarksFile: null,
    privateRemarks: "",
    privateRemarksFile: null,
  });

  const auth = useRecoilValue(EmployeeState);

  const [ isUpdated, setIsUpdated ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const putOrderDetail = async (): Promise<void> => {
    if (orderDetailForUpdate) {
      EmployeeAxios._setToken(auth);
      setValidationErrors(prevState => []);

      const body = {
        id: orderDetailForUpdate.id,
        trackingNo: orderDetailForUpdate.trackingNo,
        productName: orderDetailForUpdate.name,
        orderStatus: orderDetailForUpdate.statusOption?.value,
        variation: orderDetailForUpdate.variation,
        shopName: orderDetailForUpdate.shopName,
        productImage: orderDetailForUpdate.productFile,
        quantity: orderDetailForUpdate.quantity,
        productUrl: orderDetailForUpdate.productUrl,
        mall: orderDetailForUpdate.mallOption?.value,
        postage: orderDetailForUpdate.postage,
        publicRemarks: orderDetailForUpdate.publicRemarks,
        publicRemarksFile: orderDetailForUpdate.publicRemarksFile,
        privateRemarks: orderDetailForUpdate.privateRemarks,
        privateRemarksFile: orderDetailForUpdate.privateRemarksFile,
        orderDetailOthers: orderDetailForUpdate?.otherPrices.map(otherPrice => {
          return {
            name: otherPrice.name,
            price: otherPrice.price,
          };
        }),
      };

      const uri = setIdPathParam(orderDetailForUpdate.id, routes.api.employee.orderDetail.update.url);
      try {
        await EmployeeAxios.put<ApiResponse>({
          isMultiPart: true,
          uri: uri,
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

export { useUpdate };
