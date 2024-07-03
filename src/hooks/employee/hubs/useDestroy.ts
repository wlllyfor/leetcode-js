import { EmployeeState } from "@/store/Auth/EmployeeState";
import { useRecoilValue } from "recoil";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { Dispatch, SetStateAction, useState } from "react";
import { HubDbTableType } from "@/types/db/hub";
import { toast } from "react-toastify";
import { routes } from "@/routes";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    tax: HubDbTableType;
  };
}

export type HubForDestroyType = {
  id: number | null;
};

export const defaultHubForPostType: HubForDestroyType = {
  id: null,
};


export const useDestroy = (): {
  destroyHub: () => Promise<void>;
  hubForDestroy: HubForDestroyType;
  setHubForDestroy: Dispatch<SetStateAction<HubForDestroyType>>;
  isLoading: boolean;
  isDestroyed: boolean;
  setIsDestroyed: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(EmployeeState);

  const [ hubForDestroy, setHubForDestroy ] = useState<HubForDestroyType>(defaultHubForPostType);

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isDestroyed, setIsDestroyed ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const destroyHub = async (): Promise<void> => {
    if(!hubForDestroy.id) {
      return;
    }
    EmployeeAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      id: hubForDestroy.id,
    };

    try {
      setIsLoading(true);
      await EmployeeAxios.delete<ApiResponse>({
        uri: routes.api.employee.hub.delete.url,
        body: Str.decamelizeKeys(body),
      });
      setIsDestroyed(prevState => true);
      toast.success("削除に成功しました");
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
    destroyHub,
    hubForDestroy,
    setHubForDestroy,
    isLoading,
    isDestroyed,
    setIsDestroyed,
    validationErrors,
    setValidationErrors,
  };
};
