"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes, setIdPathParam } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { toast } from "react-toastify";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { Str } from "@/lib/Str";

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

export type ReceiveStockForUpdateType = {
  id: number | null;
  productAndQuantities: ProductAndQuantityType[];
  trackingNo: string | null;
  publicRemarks: string | null;
  publicRemarksFile: File | null;
};

const useUpdate = (): {
  updateReceiveStock: () => Promise<void>;
  receiveStockForUpdate: ReceiveStockForUpdateType | undefined;
  setReceiveStockForUpdate: Dispatch<SetStateAction<ReceiveStockForUpdateType | undefined>>;
  isUpdated: boolean;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(CustomerState);

  const [ receiveStockForUpdate, setReceiveStockForUpdate ] = useState<ReceiveStockForUpdateType>();

  const [ isUpdated, setIsUpdated ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const updateReceiveStock = async (): Promise<void> => {
    if (!receiveStockForUpdate) {
      return;
    }
    CustomerAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      id: receiveStockForUpdate.id,
      trackingNo: receiveStockForUpdate.trackingNo,
      publicRemarks: receiveStockForUpdate.publicRemarks,
      publicRemarksFile: receiveStockForUpdate.publicRemarksFile,
      products: receiveStockForUpdate?.productAndQuantities.map(productAndQuantity => {
        return {
          id: productAndQuantity.option.value,
          quantity: productAndQuantity.quantity,
        };
      }),
    };

    try {
      const uri = setIdPathParam(receiveStockForUpdate.id, routes.api.customer.receiveStock.update.url);

      await CustomerAxios.put<ApiResponse>({
        uri: uri,
        isMultiPart: true,
        body: Str.decamelizeKeys(body),
      });

      setIsUpdated(prevState => true);
      toast.success("更新に成功しました");
    } catch (error) {
      CustomerAxios.showErrors(error);
      const validationErrors = CustomerAxios.get422Errors(error);
      setValidationErrors(prevState => validationErrors);
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
