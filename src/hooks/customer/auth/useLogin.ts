"use client";

import { Dispatch, SetStateAction, useState } from "react";
import GuestAxios from "@/lib/axios/guest-axios";
import { CustomerDbTableType } from "@/types/db/customer";
import { routes } from "@/routes";
import { toast } from "react-toastify";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: { token: string; customer: CustomerDbTableType; };
}

const useLogin = (): {
  email: string;
  password: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  login: (hubCode: string) => Promise<string | undefined>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const login = async (hubCode: string) => {
    const params = {
      email: email,
      password: password,
      hubCode: hubCode,
    };

    try {
      const response = await GuestAxios.post<ApiResponse>({
        uri: routes.api.customer.auth.login.url,
        body: Str.decamelizeKeys(params),
      });

      const authenticatedCustomer = response.data.body as {
        token: string;
        customer: CustomerDbTableType;
      };

      if(!authenticatedCustomer || !authenticatedCustomer.token || !authenticatedCustomer.customer) {
        throw new Error(`ログイン情報が取得できませんでした。\nauthenticatedCustomer: ${JSON.stringify(authenticatedCustomer)}`);
      }

      toast.success("ログインに成功しました");

      return authenticatedCustomer.token;
    } catch (error) {
      GuestAxios.showErrors(error);
      const validationErrors = GuestAxios.get422Errors(error);
      setValidationErrors(prevState => validationErrors);
      toast.error("ログインに失敗しました");
    }
  };

  return { email, password, setEmail, setPassword, login, validationErrors, setValidationErrors };
};

export { useLogin };
