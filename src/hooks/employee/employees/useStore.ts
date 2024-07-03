import { Str } from "@/lib/Str";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { routes } from "@/routes";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import { EmployeeDbTableType } from "@/types/db/employee";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

interface ApiResponse {
  body: {
    employees: EmployeeDbTableType[];
  };
};

type EmployeeForPostType = {
  name?: string;
  kana: string;
  email: string;
  password: string;
  public_remarks?: string;
  icon: File | null;
  joined_on: string;
  details?: {
    hub_id: number;
    group_id?: number;
    job_position_id: number | undefined;
    employee_status: "enrollment" | "retirement" | "suspension" | undefined;
  }[];
};

const defaultEmployee: EmployeeForPostType = {
  name: "",
  kana: "",
  email: "",
  password: "",
  public_remarks: "",
  icon: null,
  joined_on: "",
};

export const useStore = (): {
  postEmployee: () => Promise<void>;
    employeeForPost: EmployeeForPostType;
    setEmployeeForPost: Dispatch<SetStateAction<EmployeeForPostType>>;
    isLoading: boolean;
    isStored: boolean;
    setIsStored: Dispatch<SetStateAction<boolean>>;
    validationErrors: string[];
    setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(EmployeeState);

  const [ employeeForPost, setEmployeeForPost ] = useState<EmployeeForPostType>(defaultEmployee);

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isStored, setIsStored ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const postEmployee = async (): Promise<void> => {
    if (!employeeForPost) {
      return;
    }
    EmployeeAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      name: employeeForPost.name,
      kana: employeeForPost.kana,
      email: employeeForPost.email,
      password: employeeForPost.password,
      public_remarks: employeeForPost.public_remarks,
      icon: employeeForPost.icon,
      joined_on: employeeForPost.joined_on,
      details: employeeForPost.details,
    };

    try {
      setIsLoading(prevState => true);

      await EmployeeAxios.post<ApiResponse>({
        uri: routes.api.employee.employee.store.url,
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
    } finally {
      setIsLoading(false);
    }
    setIsLoading(prevState => false);
  };

  return {
    postEmployee,
    employeeForPost,
    setEmployeeForPost,
    isLoading,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
  };
};
