"use client";

import { ProductDbTableType } from "@/types/db/product/product";
import { Dispatch, SetStateAction, useState } from "react";
import { routes, setIdPathParam } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { enumProduct } from "@/types/enum/enumProduct";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { toast } from "react-toastify";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    product: ProductDbTableType;
  };
}

export type CaseProductChildType = {
  keyId: string;
  id: number | null;
  quantity: number | null;
  default: ReactSelectOption | null;
};

export type ProductForUpdateType = {
  name: string;
  sku: string | null;
  janCode: string | null;
  unitPrice: number;
  nameToSlip: string | null;
  caseProductType: string | null;
  childProducts: CaseProductChildType[] | null;
};

const useUpdate = (): {
  putProduct: (prevProduct: ProductDbTableType) => void;
  productForUpdate: ProductForUpdateType;
  setProductForUpdate: Dispatch<SetStateAction<ProductForUpdateType>>;
  isUpdated: boolean;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const [ productForUpdate, setProductForUpdate ] = useState<ProductForUpdateType>({
    name: "",
    sku: null,
    janCode: null,
    unitPrice: 0,
    nameToSlip: null,
    caseProductType: null,
    childProducts: null,
  });
  const auth = useRecoilValue(CustomerState);
  const [ isUpdated, setIsUpdated ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const putProduct = async (prevProduct: ProductDbTableType): Promise<void> => {
    await (async (): Promise<void> => {
      CustomerAxios._setToken(auth);
      setValidationErrors(prevState => []);

      const body = {
        id: prevProduct.id,
        productType: enumProduct.case,
        name: productForUpdate.name,
        sku: productForUpdate.sku,
        janCode: productForUpdate.janCode,
        nameToSlip: productForUpdate.nameToSlip,
        unitPrice: productForUpdate.unitPrice,
        caseProductType: productForUpdate.caseProductType,
        caseChildProduct: productForUpdate.childProducts,
        isDisabled: false,
      };

      const uri = setIdPathParam(prevProduct.id, routes.api.customer.product.update.url);
      try {
        await CustomerAxios.put<ApiResponse>({
          uri: uri,
          body: Str.decamelizeKeys(body),
        });

        setIsUpdated(true);
        toast.success("登録に成功しました");
      } catch (error) {
        CustomerAxios.showErrors(error);
        const validationErrors = CustomerAxios.get422Errors(error);
        setValidationErrors(prevState => validationErrors);
        toast.error("入力内容に不備があります。");
      }
    })();
  };

  return {
    putProduct,
    productForUpdate,
    setProductForUpdate,
    isUpdated,
    setIsUpdated,
    validationErrors,
    setValidationErrors,
  };
};

export { useUpdate };
