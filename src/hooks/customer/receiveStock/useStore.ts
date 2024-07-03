"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { toast } from "react-toastify";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
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
  hubCode: string | null;
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
  const auth = useRecoilValue(CustomerState);

  const [ receiveStockForPost, setReceiveStockForPost ] = useState<ReceiveStockForPostType>();

  const [ storedReceiveStock, setStoredReceiveStock ] = useState<ReceiveStockDbTableType | null>(null);

  const [ isStored, setIsStored ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const postReceiveStock = async (): Promise<void> => {
    if (!receiveStockForPost) {
      return;
    }

    CustomerAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      hubCode: receiveStockForPost.hubCode,
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

    try {
      const response = await CustomerAxios.post<ApiResponse>({
        uri: routes.api.customer.receiveStock.store.url,
        isMultiPart: true,
        body: Str.decamelizeKeys(body),
      });
      const storedRecord = response.data.body.receiveStock as ReceiveStockDbTableType;
      setStoredReceiveStock(prevState => storedRecord);

      setIsStored(prevState => true);
      toast.success("登録に成功しました");
    } catch (error) {
      CustomerAxios.showErrors(error);
      const validationErrors = CustomerAxios.get422Errors(error);
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
