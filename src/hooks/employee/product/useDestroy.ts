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

const useDestroy = (): {
  destroyProduct: (id: number | null) => Promise<void>;
  isDestroyed: boolean;
  setIsDestroyed: Dispatch<SetStateAction<boolean>>;
} => {
  const auth = useRecoilValue(EmployeeState);

  const [ isDestroyed, setIsDestroyed ] = useState<boolean>(false);

  const destroyProduct = async (id: number | null): Promise<void> => {
    if (id === null) {
      setIsDestroyed(false);
      return;
    }
    await (async (): Promise<void> => {
      EmployeeAxios._setToken(auth);

      const uri = setIdPathParam(id, routes.api.employee.product.destroy.url);
      try {
        await EmployeeAxios.delete<ApiResponse>({
          uri: uri,
          body: {
            id: id,
          },
        });

        setIsDestroyed(true);
        toast.success("削除に成功しました");
      } catch (error) {
        EmployeeAxios.showErrors(error, true);
      }
    })();
  };

  return {
    destroyProduct,
    isDestroyed,
    setIsDestroyed,
  };
};

export { useDestroy };
