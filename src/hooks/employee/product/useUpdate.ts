"use client";

import { ProductDbTableType } from "@/types/db/product/product";
import { Dispatch, SetStateAction, useState } from "react";
import { routes, setIdPathParam } from "@/routes";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";

interface ApiResponse {
  body: {
    product: ProductDbTableType;
  };
}

export type ProductForUpdateType = {
  id: number | null;
  weight: number;
  height: number;
  width: number;
  depth: number;
};

const useUpdate = (): {
  putProduct: () => void;
  productForUpdate: ProductForUpdateType;
  setProductForUpdate: Dispatch<SetStateAction<ProductForUpdateType>>;
  isUpdated: boolean;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const [ productForUpdate, setProductForUpdate ] = useState<ProductForUpdateType>({
    id: null,
    weight: 0,
    height: 0,
    width: 0,
    depth: 0,
  });

  const auth = useRecoilValue(EmployeeState);

  const [ isUpdated, setIsUpdated ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const putProduct = async (): Promise<void> => {
    await (async (): Promise<void> => {
      if (productForUpdate) {
        EmployeeAxios._setToken(auth);

        const uri = setIdPathParam(productForUpdate.id, routes.api.employee.product.update.url);
        try {
          await EmployeeAxios.put<ApiResponse>({
            uri: uri,
            body: {
              id: productForUpdate.id,
              weight: productForUpdate.weight,
              height: productForUpdate.height,
              width: productForUpdate.width,
              depth: productForUpdate.depth,
            },
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
