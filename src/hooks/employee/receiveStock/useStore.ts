"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { Str } from "@/lib/Str";
import { Integer } from "@/lib/integer";

interface ApiResponse {
  body: {
    receiveStock: ReceiveStockDbTableType;
  };
}

export type ProductAndQuantityType = {
  uuid: string;
  option: ReactSelectOption;
  quantity: number;
};

export type ReceiveStockForPostType = {
  customerId: number | null;
  orderDetailId: number;
  productAndQuantities: ProductAndQuantityType[];
  trackingNo: string | null;
  publicRemarks: string | null;
  publicRemarksFile: File | null;
  withLeaveStock: boolean;
};

const useStore = (): {
  postReceiveStock: () => Promise<void>;
  receiveStockForPost: ReceiveStockForPostType | undefined;
  setReceiveStockForPost: Dispatch<SetStateAction<ReceiveStockForPostType | undefined>>;
  isStored: boolean;
  setIsStored: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
  storedReceiveStock: ReceiveStockDbTableType | null;
} => {
  const auth = useRecoilValue(EmployeeState);

  const [ receiveStockForPost, setReceiveStockForPost ] = useState<ReceiveStockForPostType>();

  const [ storedReceiveStock, setStoredReceiveStock ] = useState<ReceiveStockDbTableType | null>(null);

  const [ isStored, setIsStored ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const postReceiveStock = async (): Promise<void> => {
    if (!receiveStockForPost) {
      return;
    }

    EmployeeAxios._setToken(auth);
    setValidationErrors(prevState => []);
    try {
      const body = {
        orderDetailId: receiveStockForPost.orderDetailId,
        customerId: receiveStockForPost.customerId,
        trackingNo: receiveStockForPost.trackingNo,
        publicRemarks: receiveStockForPost.publicRemarks,
        publicRemarksFile: receiveStockForPost.publicRemarksFile,
        withLeaveStock: Integer.boolToInteger(receiveStockForPost.withLeaveStock),
        products: receiveStockForPost?.productAndQuantities.map(productAndQuantity => {
          return {
            id: productAndQuantity.option.value,
            quantity: productAndQuantity.quantity,
          };
        }),
      };

      const response = await EmployeeAxios.post<ApiResponse>({
        uri: routes.api.employee.receiveStock.store.url,
        isMultiPart: true,
        body: Str.decamelizeKeys(body),
      });
      const storedRecord = response.data.body.receiveStock as ReceiveStockDbTableType;
      setStoredReceiveStock(prevState => storedRecord);

      setIsStored(prevState => true);
      toast.success("登録に成功しました");
    } catch (error) {
      EmployeeAxios.showErrors(error);
      const validationErrors = EmployeeAxios.get422Errors(error);
      setValidationErrors(prevState => validationErrors);
      toast.error("入力内容に不備があります。");
    }
  };

  return {
    postReceiveStock,
    receiveStockForPost,
    setReceiveStockForPost,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
    storedReceiveStock,
  };
};

export { useStore };
