"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { toast } from "react-toastify";
import { Str } from "@/lib/Str";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";
import EmployeeAxios from "@/lib/axios/employee-axios";

interface ApiResponse {
  body: {
    orderDetails: OrderDetailDbTableType[];
  };
}

export type CaseProductChildType = {
  keyId: string;
  id: number | null;
  quantity: number | null;
  default: ReactSelectOption | null;
};

export type OrderDetailForUpdateBulkType = {
  id: number;
  orderStatus: string;
  mallOrderId: string | null;
  shopName: string | null;
  orderProductName: string;
  variation: string;
  unitPrice: number;
  quantity: number;
  postage: number;
  others: OrderDetailOtherForUpdateBulkType[];
  publicRemarks: string;
  publicRemarksFile: File | null;
  receipt: string;
  receiptFile: File | null;
};

type OrderDetailOtherForUpdateBulkType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const useUpdateBulk = (): {
  putOrderDetails: () => void;
  orderDetailForUpdateBulk: OrderDetailForUpdateBulkType[];
  setOrderDetailForUpdateBulk: Dispatch<SetStateAction<OrderDetailForUpdateBulkType[]>>;
  isUpdated: boolean;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const [ orderDetailForUpdateBulk, setOrderDetailForUpdateBulk ] = useState<OrderDetailForUpdateBulkType[]>([]);
  const auth = useRecoilValue(EmployeeState);
  const [ isUpdated, setIsUpdated ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const putOrderDetails = async (): Promise<void> => {
    await (async (): Promise<void> => {
      EmployeeAxios._setToken(auth);
      setValidationErrors(prevState => []);

      const body = {
        orderDetails: orderDetailForUpdateBulk.map(detail => {
          return {
            ...detail,
            id: detail.id,
            orderStatus: detail.orderStatus,
            mallOrderId: detail.mallOrderId,
            shopName: detail.shopName,
            orderProductName: detail.orderProductName,
            variation: detail.variation,
            unitPrice: detail.unitPrice,
            quantity: detail.quantity,
            postage: detail.postage,
            publicRemarks: detail.publicRemarks,
            publicRemarksFile: detail.publicRemarksFile,
            receipt: detail.receipt,
            receiptFile: detail.receiptFile,
            others: detail.others,
          };
        }),
      };

      try {
        await EmployeeAxios.put<ApiResponse>({
          uri: routes.api.employee.orderDetail.updateBulk.url,
          isMultiPart: true,
          body: Str.decamelizeKeys(body),
        });

        setIsUpdated(true);
        toast.success("登録に成功しました");
      } catch (error) {
        EmployeeAxios.showErrors(error);
        const validationErrors = EmployeeAxios.get422Errors(error);
        setValidationErrors(prevState => validationErrors);
        toast.error("入力内容に不備があります。");
      }
    })();
  };

  return {
    putOrderDetails,
    orderDetailForUpdateBulk,
    setOrderDetailForUpdateBulk,
    isUpdated,
    setIsUpdated,
    validationErrors,
    setValidationErrors,
  };
};

export { useUpdateBulk };
