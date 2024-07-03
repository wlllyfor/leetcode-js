"use client";

import { Dispatch, SetStateAction, useState } from "react";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";
import { toast } from "react-toastify";
import { EmployeeDbTableType } from "@/types/db/employee";

interface ApiResponse {
  body: { token: string; employee: EmployeeDbTableType; };
}

export type EmployeeForLoginType = {
  email: string;
  password: string;
};

const useLogin = (): {
  login: () => Promise<string | undefined>;
  employeeForLogin: EmployeeForLoginType | undefined;
  setEmployeeForLogin: Dispatch<SetStateAction<EmployeeForLoginType | undefined>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const [ employeeForLogin, setEmployeeForLogin ] = useState<EmployeeForLoginType>();

  const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const login = async (): Promise<string | undefined> => {
    try {
      const response = await GuestAxios.post<ApiResponse>({
        uri: routes.api.employee.auth.login.url,
        body: {
          email: employeeForLogin?.email,
          password: employeeForLogin?.password,
        },
      });

      const authenticatedEmployee = response.data.body as {
        token: string;
        employee: EmployeeDbTableType;
      };
      toast.success("ログインに成功しました");

      return authenticatedEmployee.token;
    } catch (error) {
      GuestAxios.showErrors(error);
      const validationErrors = GuestAxios.get422Errors(error);
      await setValidationErrors(prevState => validationErrors);
      toast.error("ログインに失敗しました");
    }
  };

  return {
    employeeForLogin,
    setEmployeeForLogin,
    isLoggedIn,
    setIsLoggedIn,
    validationErrors,
    setValidationErrors,
    login,
  };
};

export { useLogin };
