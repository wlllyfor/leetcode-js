"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { toast } from "react-toastify";
import { Str } from "@/lib/Str";
import { CustomerCartDbType } from "@/types/db/customerCart";
import { CustomerCartForPost, emptyCustomerCartForPost } from "@/types/entity/order/cart/customerCartForPost";
import { enumMall } from "@/types/enum/enumMall";

interface ApiResponse {
  body: {
    order: CustomerCartDbType;
  };
}

const useStore = (
  hubCode: string,
): {
  postCustomerCart: () => Promise<void>;
  customerCartForPost: CustomerCartForPost;
  setCustomerCartForPost: Dispatch<SetStateAction<CustomerCartForPost>>;
  isStored: boolean;
  setIsStored: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(CustomerState);

  const [ customerCartForPost, setCustomerCartForPost ] = useState<CustomerCartForPost>(emptyCustomerCartForPost);

  const [ isStored, setIsStored ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const postCustomerCart = async (): Promise<void> => {
    CustomerAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      hubCode: hubCode,
      mall: enumMall.alibaba,
      products: customerCartForPost?.products.map(product => {
        return {
          productId: product.productId,
          productName: product.productName,
          skuId: product.skuId,
          variation: product.variation,
          size: product.size,
          imageUrl: product.imageUrl,
          unitPrice: product.unitPrice,
          quantity: product.quantity,
        };
      }),
    };

    try {
      await CustomerAxios.post<ApiResponse>({
        uri: routes.api.customer.order.cart.store.url,
        isMultiPart: false,
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
    postCustomerCart,
    customerCartForPost,
    setCustomerCartForPost,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
  };
};

export { useStore };
