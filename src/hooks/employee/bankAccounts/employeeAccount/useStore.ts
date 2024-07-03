import { Str } from "@/lib/Str";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { routes } from "@/routes";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import { EmployeeAccountDbTableType } from "@/types/db/bankAccounts/EmployeeAccountDbTableType";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

type ApiResponse = {
  body: {
    plan: EmployeeAccountDbTableType;
  };
};

type EmployeeAccountForPostType = {
  hub_id: number | null;
  name: string;
};

const defaultEmployeeAccountForPostType: EmployeeAccountForPostType = {
  hub_id: null,
  name: "",
};

export const useStore = (): {
  postEmployeeAccount: () => Promise<void>;
  employeeAccountForPost: EmployeeAccountForPostType;
  setEmployeeAccountForPost: Dispatch<SetStateAction<EmployeeAccountForPostType>>;
  isLoading: boolean;
  isStored: boolean;
  setIsStored: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(EmployeeState);

  const [ employeeAccountForPost, setEmployeeAccountForPost ] = useState<EmployeeAccountForPostType>(defaultEmployeeAccountForPostType);

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isStored, setIsStored ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const postEmployeeAccount = async (): Promise<void> => {
    if (!employeeAccountForPost) {
      return;
    }
    EmployeeAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      hub_id: employeeAccountForPost.hub_id,
      name: employeeAccountForPost.name,
    };

    try {
      setIsLoading(true);

      await EmployeeAxios.post<ApiResponse>({
        uri: routes.api.employee.employeeAccount.store.url,
        isMultiPart: false,
        body: Str.decamelizeKeys(body),
      });
      setIsStored(true);
      toast.success("登録に成功しました");
    } catch (error) {
      EmployeeAxios.showErrors(error);
      const validationErrors = EmployeeAxios.get422Errors(error);
      setValidationErrors(prevState => validationErrors);
      toast.error("入力内容に不備があります。");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    postEmployeeAccount,
    employeeAccountForPost,
    setEmployeeAccountForPost,
    isLoading,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
  };
};
