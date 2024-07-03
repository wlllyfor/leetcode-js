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

type CustomerForPostType = {
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

const defaultCustomerForPost: CustomerForPostType = {
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

export const useStore = (): {
  customerPost: () => Promise<void>;
  customerForPost: CustomerForPostType;
  setCustomerForPost: Dispatch<SetStateAction<CustomerForPostType>>;
  isLoading: boolean;
  isStored: boolean;
  setIsStored: Dispatch<SetStateAction<boolean>>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const auth = useRecoilValue(CustomerState);
  const [ customerForPost, setCustomerForPost ] = useState<CustomerForPostType>(defaultCustomerForPost);

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isStored, setIsStored ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const customerPost = async (): Promise<void> => {
    if(!customerForPost) {
      return;
    }

    CustomerAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const customer = await CustomerAxios.getMe() as CustomerDbTableType;

    if(!customer|| !customer.id) {
      throw new Error("customer is not found.");
    }

    const body: CustomerForPostType = {
      id: customer.id,
      email: customerForPost.email,
      name: customerForPost.name,
      name_kana: customerForPost.name_kana,
      country_id: customerForPost.country_id,
      postal_code: customerForPost.postal_code,
      prefecture_name: customerForPost.prefecture_name,
      city_name: customerForPost.city_name,
      town_name: customerForPost.town_name,
      building_name: customerForPost.building_name,
      tel: customerForPost.tel,
      company_name: customerForPost.company_name,
      chat_work_id: customerForPost.chat_work_id,
      updated_at: customerForPost.updated_at,
    };

    try {
      setIsLoading(prevState => true);
      await CustomerAxios.put<ApiResponse>({
        uri: routes.api.customer.update.url,
        isMultiPart: false,
        body: Str.decamelizeKeys(body),
      });

      setIsStored(prevState => true);
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
    customerPost,
    customerForPost,
    setCustomerForPost,
    isLoading,
    isStored,
    setIsStored,
    validationErrors,
    setValidationErrors,
  };
};
