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

interface IHubUpdate {
  id: number | null;
  name: string;
  icon?: File | null;
  code: string;
  country_id: number;
  currency_id: number;
  group_names?: {id: number; name: string;}[];
  delete_group_id_list?: { id: number; }[];
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

const defaultHubForPost: IHubUpdate = {
  id: null,
  name: "",
  code: "",
  country_id: 0,
  currency_id: 0,
  group_names: [],
  delete_group_id_list: [],
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

export const useUpdate = (): {
  updateHub: () => void;
  isLoading: boolean;
  isUpdated: boolean;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
  hubForUpdate: IHubUpdate;
  setHubForUpdate: Dispatch<SetStateAction<IHubUpdate>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(EmployeeState);

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isUpdated, setIsUpdated ] = useState<boolean>(false);
  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const [ hubForUpdate, setHubForUpdate ] = useState<IHubUpdate>(defaultHubForPost);

  const updateHub = async (): Promise<void> => {
    if(!hubForUpdate) {
      return;
    }
    EmployeeAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      id: hubForUpdate.id,
      name: hubForUpdate.name,
      icon: hubForUpdate.icon,
      code: hubForUpdate.code,
      country_id: hubForUpdate.country_id,
      currency_id: hubForUpdate.currency_id,
      group_names: hubForUpdate.group_names,
      delete_group_id_list: hubForUpdate.delete_group_id_list,
      company_name: hubForUpdate.company_name,
      is_domestic: hubForUpdate.is_domestic,
      postal_code: hubForUpdate.postal_code,
      prefecture_name: hubForUpdate.prefecture_name,
      city_name: hubForUpdate.city_name,
      town_name: hubForUpdate.town_name,
      building_name: hubForUpdate.building_name,
      description: hubForUpdate.description,
      is_contact_hub: hubForUpdate.is_contact_hub,
      invoice_no: hubForUpdate.invoice_no,
    };

    try {
      setIsLoading(true);
      await EmployeeAxios.put<ApiResponse>({
        uri: routes.api.employee.hub.update.url,
        isMultiPart: false,
        body: Str.decamelizeKeys(body),
      });

      setIsUpdated(prevState => true);
      toast.success(`${body.name}の更新に成功しました`);
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
    updateHub,
    hubForUpdate,
    setHubForUpdate,
    isLoading,
    isUpdated,
    setIsUpdated,
    validationErrors,
    setValidationErrors,
  };
};

