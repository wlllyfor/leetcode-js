"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { toast } from "react-toastify";
import { OrderDetailForPost } from "@/types/entity/order/orderDetailForPost";
import { OrderTypeDbType } from "@/types/db/order/order";
import { Str } from "@/lib/Str";
import { enumMall } from "@/types/enum/enumMall";

interface ApiResponse {
  body: {
    order: OrderTypeDbType;
  };
}

const useStore = (
  hubCode: string,
): {
  postOrder: () => Promise<void>;
  toOrderProducts: OrderDetailForPost | null;
  setToOrderProducts: Dispatch<SetStateAction<OrderDetailForPost | null>>;
  isStored: boolean;
  setIsStored: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(CustomerState);

  const [ toOrderProducts, setToOrderProducts ] = useState<OrderDetailForPost | null>(null);

  const [ isStored, setIsStored ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const postOrder = async (): Promise<void> => {
    CustomerAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      orderType: toOrderProducts?.orderType,
      hubCode: hubCode,
      products: toOrderProducts?.products.map(toOrderProduct => {
        return {
          name: toOrderProduct.name,
          mall: enumMall.alibaba,
          productUrl: toOrderProduct.productUrl,
          sku: toOrderProduct.sku,
          unitPrice: toOrderProduct.unitPrice,
          quantity: toOrderProduct.quantity,
          variation: toOrderProduct.variation,
          publicRemarks: toOrderProduct.publicRemarks,
          publicRemarksFile: toOrderProduct.publicRemarksFile,
          // カート用
          customerCartId: toOrderProduct.customerCartId,
          productImageUrl: toOrderProduct.productImageUrl,
        };
      }),
    };
    try {
      await CustomerAxios.post<ApiResponse>({
        uri: routes.api.customer.order.store.url,
        isMultiPart: true,
        body: Str.decamelizeKeys(body),
      });

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
    postOrder,
    toOrderProducts,
    setToOrderProducts,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
  };
};

export { useStore };
