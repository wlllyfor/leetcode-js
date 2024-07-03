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

type EmployeeForUpdateType = {
  id: number | null;
  name?: string;
  kana: string;
  email: string;
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

const defaultEmployee: EmployeeForUpdateType = {
  id: null,
  name: "",
  kana: "",
  email: "",
  public_remarks: "",
  icon: null,
  joined_on: "",
  details: undefined,
};

export const useUpdate = (): {
  updateEmployee: () => void;
  isLoading: boolean;
  isUpdated: boolean;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
  employeeForUpdate: EmployeeForUpdateType;
  setEmployeeForUpdate: Dispatch<SetStateAction<EmployeeForUpdateType>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(EmployeeState);

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isUpdated, setIsUpdated ] = useState<boolean>(false);
  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const [ employeeForUpdate, setEmployeeForUpdate ] = useState<EmployeeForUpdateType>(defaultEmployee);

  const updateEmployee = async (): Promise<void> => {
    if(!employeeForUpdate) {
      return;
    }
    EmployeeAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      id: employeeForUpdate.id,
      name: employeeForUpdate.name,
      kana: employeeForUpdate.kana,
      email: employeeForUpdate.email,
      public_remarks: employeeForUpdate.public_remarks,
      icon: employeeForUpdate.icon,
      joined_on: employeeForUpdate.joined_on,
      details: employeeForUpdate.details,
    };

    try {
      setIsLoading(prevState => true);
      await EmployeeAxios.put<ApiResponse>({
        uri: routes.api.employee.employee.update.url,
        isMultiPart: false,
        body: Str.decamelizeKeys(body),
      });

      setIsUpdated(prevState => true);
      toast.success("更新に成功しました");
    } catch (error) {
      EmployeeAxios.showErrors(error);
      const validationErrors = EmployeeAxios.get422Errors(error);
      setValidationErrors(prevState => validationErrors);
      toast.error("入力内容に不備があります。");
    } finally {
      setIsLoading(prevState => false);
    }
  };

  return {
    updateEmployee,
    isLoading,
    isUpdated,
    setIsUpdated,
    employeeForUpdate,
    setEmployeeForUpdate,
    validationErrors,
    setValidationErrors,
  };
};
