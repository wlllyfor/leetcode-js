"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { routes } from "@/routes";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { useRecoilValue } from "recoil";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import { toast } from "react-toastify";
import { Str } from "@/lib/Str";
import { EmployeeCartDbType } from "@/types/db/employeeCart";
import { EmployeeCartForPost, emptyEmployeeCartForPost } from "@/types/entity/order/cart/employeeCartForPost";

interface ApiResponse {
  body: {
    order: EmployeeCartDbType;
  };
}

const useStore = (): {
  postEmployeeCart: () => Promise<void>;
  employeeCartForPost: EmployeeCartForPost;
  setEmployeeCartForPost: Dispatch<SetStateAction<EmployeeCartForPost>>;
  isStored: boolean;
  setIsStored: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(EmployeeState);

  const [ employeeCartForPost, setEmployeeCartForPost ] = useState<EmployeeCartForPost>(emptyEmployeeCartForPost);

  const [ isStored, setIsStored ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const postEmployeeCart = async (): Promise<void> => {
    EmployeeAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      orderDetailIdList: employeeCartForPost.orderDetailIdList.map(id => {
        return {
          orderDetailId: id,
        };
      }),
    };

    try {
      await EmployeeAxios.post<ApiResponse>({
        uri: routes.api.employee.employeeCart.store.url,
        isMultiPart: false,
        body: Str.decamelizeKeys(body),
      });

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
    postEmployeeCart,
    employeeCartForPost,
    setEmployeeCartForPost,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
  };
};

export { useStore };
