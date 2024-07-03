"use client";

import { Dispatch, SetStateAction, useState } from "react";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";
import { toast } from "react-toastify";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { Str } from "@/lib/Str";

export type EmployeeForRegisterType = {
  name: string;
  email: string;
  password: string;
  hubId?: number;
  profileImageFile: File | null;
  jobPositionId?: number;
  groupId: number | null;
  options: {
    hub: ReactSelectOption | null;
    jobPosition: ReactSelectOption | null;
    group: ReactSelectOption | null;
  };
};

const useRegister = (): {
  register: () => Promise<void>;
  employeeForRegister: EmployeeForRegisterType | undefined;
  setEmployeeForRegister: Dispatch<SetStateAction<EmployeeForRegisterType | undefined>>;
  isRegistered: boolean;
  setIsRegistered: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const [ employeeForRegister, setEmployeeForRegister ] = useState<EmployeeForRegisterType>();

  const [ isRegistered, setIsRegistered ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const register = async (): Promise<void> => {
    if (!employeeForRegister) {
      return;
    }
    setValidationErrors(prevState => []);

    const body = {
      name: employeeForRegister.name,
      email: employeeForRegister.email,
      password: employeeForRegister.password,
      hubId: employeeForRegister.hubId,
      profileImageFile: employeeForRegister.profileImageFile,
      jobPositionId: employeeForRegister.jobPositionId,
      groupId: employeeForRegister.groupId,
    };

    try {
      await GuestAxios.post({
        isMultiPart: true,
        uri: routes.api.employee.auth.register.url,
        body: Str.decamelizeKeys(body),
      });

      setIsRegistered(prevState => true);
      toast.success("登録に成功しました");
    } catch (error) {
      GuestAxios.showErrors(error);
      const validationErrors = GuestAxios.get422Errors(error);
      await setValidationErrors(prevState => validationErrors);
      toast.error("登録に失敗しました");
    }
  };

  return {
    register,
    employeeForRegister,
    setEmployeeForRegister,
    isRegistered,
    setIsRegistered,
    validationErrors,
    setValidationErrors,
  };
};

export { useRegister };
