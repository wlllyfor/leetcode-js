"use client";

import { CustomerDbTableType } from "@/types/db/customer";
import { Dispatch, SetStateAction, useState } from "react";
import { routes } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { toast } from "react-toastify";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: { customer: CustomerDbTableType; };
}

const useUpdateChatWork = (): {
  setChatWorkId: Dispatch<SetStateAction<string>>;
  chatWorkId: string;
  setChatWorkName: Dispatch<SetStateAction<string>>;
  chatWorkName: string;
  setCustomerName: Dispatch<SetStateAction<string>>;
  customerName: string;
  setCustomerNameKana: Dispatch<SetStateAction<string>>;
  customerNameKana: string;
  updateChatWork: () => Promise<CustomerDbTableType | undefined>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
  isStored: boolean;
  isLoading: boolean;
} => {
  const [ chatWorkId, setChatWorkId ] = useState<string>("");
  const [ chatWorkName, setChatWorkName ] = useState<string>("");
  const [ customerName, setCustomerName ] = useState<string>("");
  const [ customerNameKana, setCustomerNameKana ] = useState<string>("");

  const [ isStored, setIsStored ] = useState<boolean>(false);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);
  const auth = useRecoilValue(CustomerState);

  const updateChatWork = async (): Promise<CustomerDbTableType | undefined> => {
    CustomerAxios._setToken(auth);
    setValidationErrors(prevState => []);

    const body = {
      chatWorkId: chatWorkId,
      chatWorkName: chatWorkName,
      name: customerName,
      kana: customerNameKana,
    };

    try {
      setIsLoading(prevState => true);
      const response = await CustomerAxios.post<ApiResponse>({
        uri: routes.api.customer.updateChatWork.url,
        body: Str.decamelizeKeys(body),
      });

      const res = response.data.body as { customer: CustomerDbTableType; };
      setIsStored(prevState => true);
      toast.success("更新に成功しました");

      return res.customer;
    } catch (error) {
      CustomerAxios.showErrors(error);
      const validationErrors = CustomerAxios.get422Errors(error);
      setValidationErrors(prevState => validationErrors);

      toast.error("更新に失敗しました");
    } finally {
      setIsLoading(prevState => false);
    }
  };

  return {
    chatWorkId,
    setChatWorkId,
    chatWorkName,
    setChatWorkName,
    customerName,
    setCustomerName,
    customerNameKana,
    setCustomerNameKana,
    updateChatWork,
    validationErrors,
    setValidationErrors,
    isStored,
    isLoading,
  };
};

export { useUpdateChatWork };
