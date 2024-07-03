"use client";

import { ProductDbTableType } from "@/types/db/product/product";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";

interface ApiResponse {
  body: {
    product: ProductDbTableType;
  };
}

const useFind = (): {
  product: ProductDbTableType | null;
  getProduct: () => Promise<void | (ProductDbTableType | null)>;
  sku: string;
  setSku: Dispatch<SetStateAction<string>>;
} => {
  const auth = useRecoilValue(CustomerState);
  const [ product, setProduct ] = useState<ProductDbTableType | null>(null);

  // 検索条件
  const [ sku, setSku ] = useState<string>("");

  const getProduct = useCallback(async (): Promise<void | ProductDbTableType> => {
    CustomerAxios._setToken(auth);
    try {
      const response = await CustomerAxios.get<ApiResponse>({
        uri: routes.api.customer.product.find.url,
        params: {
          sku: sku,
        },
      });
      const product = response.data.body.product as ProductDbTableType;
      setProduct(prevState => product);
      return product;
    } catch (error) {
      CustomerAxios.showErrors(error);
    }
  }, [ sku, auth ]);

  return { product, getProduct, sku, setSku };
};

export { useFind };
