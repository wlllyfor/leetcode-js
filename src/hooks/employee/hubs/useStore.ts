import { EmployeeState } from "@/store/Auth/EmployeeState";
import { useRecoilValue } from "recoil";
import { Dispatch, SetStateAction, useState } from "react";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { routes } from "@/routes";
import { Str } from "@/lib/Str";
import { toast } from "react-toastify";
import { HubDbTableType } from "@/types/db/hub";

interface ApiResponse {
  body: {
    hub: HubDbTableType;
  };
}

interface IHubRegister {
  name: string;
  icon?: File | null;
  code: string;
  country_id: number;
  currency_id: number;
  group_names?: { id: number; name: string; }[];
  company_name: string;
  is_domestic?: boolean;
  postal_code: string;
  prefecture_name: string;
  city_name: string;
  town_name: string;
  building_name?: string;
  invoice_no?: string;
  description: string;
  is_contact_hub?: boolean;
}

const defaultHubForPost: IHubRegister = {
  name: "",
  code: "",
  country_id: 0,
  currency_id: 0,
  company_name: "",
  postal_code: "",
  prefecture_name: "",
  city_name: "",
  town_name: "",
  building_name: "",
  description: "",
  invoice_no: "",
  is_contact_hub: false,
};

export const useStore = (): {
  postHub: () => Promise<void>;
  isStored: boolean;
  setIsStored: Dispatch<SetStateAction<boolean>>;
  hubForPost: IHubRegister;
  setHubForPost: Dispatch<SetStateAction<IHubRegister>>;
  isLoading: boolean;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(EmployeeState);

  const [ hubForPost, setHubForPost ] = useState<IHubRegister>(defaultHubForPost);

  const [ isStored, setIsStored ] = useState<boolean>(false);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const postHub = async (): Promise<void> => {
    if(!hubForPost) {
      return;
    }

    EmployeeAxios._setToken(auth);
    setValidationErrors(_ => []);

    const body = {
      name: hubForPost.name,
      code: hubForPost.code,
      icon: hubForPost.icon,
      country_id: hubForPost.country_id,
      currency_id: hubForPost.currency_id,
      group_names: hubForPost.group_names,
      company_name: hubForPost.company_name,
      is_domestic: hubForPost.is_domestic,
      postal_code: hubForPost.postal_code,
      prefecture_name: hubForPost.prefecture_name,
      city_name: hubForPost.city_name,
      town_name: hubForPost.town_name,
      building_name: hubForPost.building_name,
      description: hubForPost.description,
      is_contact_hub: hubForPost.is_contact_hub,
      invoice_no: hubForPost.invoice_no,
    };

    try {
      setIsLoading(prevState => true);

      await EmployeeAxios.post<ApiResponse>({
        uri: routes.api.employee.hub.store.url,
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
      setIsLoading(prevState => false);
    }
  };

  return {
    isStored,
    setIsStored,
    hubForPost,
    setHubForPost,
    postHub,
    isLoading,
    validationErrors,
    setValidationErrors,
  };
};

