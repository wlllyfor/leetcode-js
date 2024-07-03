"use client";

import { ProductDbTableType } from "@/types/db/product/product";
import { Dispatch, SetStateAction, useState } from "react";
import { routes } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { enumProductLabel } from "@/types/enum/enumProductLabel";
import { enumProduct } from "@/types/enum/enumProduct";
import useAuth from "@/hooks/customer/useAuth";
import { toast } from "react-toastify";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    product: ProductDbTableType;
  };
}

type CaseProductChildType = {
  keyId: string;
  id: number | null;
  quantity: number | null;
};

export type CaseProductForPostType = {
  name: string;
  sku: string | null;
  janCode: string | null;
  nameToSlip: string | null;
  caseProductType: string | null;
  childProducts: CaseProductChildType[] | null;
};

const useStoreToCaseProduct = (
  hubCode: string,
): {
  postProduct: () => void;
  productForStore: CaseProductForPostType;
  setProductForStore: Dispatch<SetStateAction<CaseProductForPostType>>;
  isStored: boolean;
  setIsStored: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const [ productForStore, setProductForStore ] = useState<CaseProductForPostType>({
    name: "",
    sku: null,
    janCode: null,
    nameToSlip: null,
    caseProductType: null,
    childProducts: null,
  });

  const auth = useRecoilValue(CustomerState);
  const customer = useAuth();

  const [ isStored, setIsStored ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const postProduct = async (): Promise<void> => {
    CustomerAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      customerId: customer?.id,
      hubCode: hubCode,
      productType: enumProduct.case,
      name: productForStore.name,
      sku: productForStore.sku,
      janCode: productForStore.janCode,
      nameToSlip: productForStore.nameToSlip,
      productLabelType: enumProductLabel.janCode,
      caseProductType: productForStore.caseProductType,
      caseChildProducts: productForStore.childProducts,
    };
    try {
      await CustomerAxios.post<ApiResponse>({
        uri: routes.api.customer.product.store.url,
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
    postProduct,
    productForStore,
    setProductForStore,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
  };
};

export { useStoreToCaseProduct };
