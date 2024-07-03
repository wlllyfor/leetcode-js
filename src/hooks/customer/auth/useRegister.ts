"use client";

import { CustomerDbTableType } from "@/types/db/customer";
import { Dispatch, SetStateAction, useState } from "react";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";
import { toast } from "react-toastify";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: CustomerDbTableType;
}

const useRegister = (): {
  setPassword: Dispatch<SetStateAction<string>>;
  password: string;
  setEmail: Dispatch<SetStateAction<string>>;
  email: string;
  register: (hubCode: string) => Promise<CustomerDbTableType | undefined>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const register = async (hubCode: string) => {
    const params = {
      email: email,
      password: password,
      hubCode: hubCode,
    };

    try {
      const response = await GuestAxios.post<ApiResponse>({
        uri: routes.api.customer.auth.register.url,
        body: Str.decamelizeKeys(params),
      });

      toast.success("登録に成功しました");
      return response.data.body as CustomerDbTableType;
    } catch (error) {
      GuestAxios.showErrors(error);
      const validationErrors = GuestAxios.get422Errors(error);
      setValidationErrors(prevState => validationErrors);
      toast.error("登録に失敗しました");
    }
  };

  return { email, password, setEmail, setPassword, register, validationErrors, setValidationErrors };
};

export { useRegister };
