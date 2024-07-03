import { Str } from "@/lib/Str";
import CustomerAxios from "@/lib/axios/customer-axios";
import { routes } from "@/routes";
import { CustomerState } from "@/store/Auth/CustomerState";
import { CustomerDbTableType } from "@/types/db/customer";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

interface ApiResponse {
  body: {
    customer: CustomerDbTableType;
  };
}

type CustomerForUpdateType = {
  id: number | null;
  email: string;
  name: string;
  name_kana: string;
  country_id: number | null;
  postal_code: string;
  prefecture_name: string;
  city_name: string;
  town_name: string;
  building_name?: string;
  tel?: string;
  company_name: string;
  chat_work_id: string;
  updated_at: string;
};

const defaultCustomerForUpdate: CustomerForUpdateType = {
  id: null,
  email: "",
  name: "",
  name_kana: "",
  country_id: null,
  postal_code: "",
  prefecture_name: "",
  city_name: "",
  town_name: "",
  company_name: "",
  chat_work_id: "",
  updated_at: "",
};

export const useUpdate = (): {
  customerUpdate: () => Promise<void>;
  customerForUpdate: CustomerForUpdateType;
  setCustomerForUpdate: Dispatch<SetStateAction<CustomerForUpdateType>>;
  isLoading: boolean;
  isUpdated: boolean;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(CustomerState);
  const [ customerForUpdate, setCustomerForUpdate ] = useState<CustomerForUpdateType>(defaultCustomerForUpdate);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isUpdated, setIsUpdated ] = useState<boolean>(false);
  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const customerUpdate = async(): Promise<void> => {
    if(!customerForUpdate.id) {
      return;
    }

    CustomerAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const customer = await CustomerAxios.getMe() as CustomerDbTableType;

    if(!customer|| !customer.id) {
      throw new Error("customer is not found.");
    }

    const body: CustomerForUpdateType = {
      id: customer.id,
      email: customerForUpdate.email,
      name: customerForUpdate.name,
      name_kana: customerForUpdate.name_kana,
      country_id: customerForUpdate.country_id,
      postal_code: customerForUpdate.postal_code,
      prefecture_name: customerForUpdate.prefecture_name,
      city_name: customerForUpdate.city_name,
      town_name: customerForUpdate.town_name,
      building_name: customerForUpdate.building_name,
      tel: customerForUpdate.tel,
      company_name: customerForUpdate.company_name,
      chat_work_id: customerForUpdate.chat_work_id,
      updated_at: customerForUpdate.updated_at,
    };

    try {
      setIsLoading(prevState => true);

      await CustomerAxios.put<ApiResponse>({
        uri: routes.api.customer.update.url,
        isMultiPart: false,
        body: Str.decamelizeKeys(body),
      });

      setIsUpdated(prevState => true);
      toast.success("登録が完了しました。");
    } catch (error) {
      CustomerAxios.showErrors(error);
      const validationErrors = CustomerAxios.get422Errors(error);
      setValidationErrors(prevState => validationErrors);
      toast.error("入力内容に不備があります。");
    } finally {
      setIsLoading(prevState => false);
    }
  };

  return {
    customerUpdate,
    customerForUpdate,
    setCustomerForUpdate,
    isLoading,
    isUpdated,
    setIsUpdated,
    validationErrors,
    setValidationErrors,
  };
};
