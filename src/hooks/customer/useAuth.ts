"use client";

import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import CustomerAxios from "@/lib/axios/customer-axios";
import { CustomerDbTableType } from "@/types/db/customer";

const useAuth = () => {
  const auth = useRecoilValue(CustomerState);
  const [ customer, setCustomer ] = useState<CustomerDbTableType | null>(null);

  useEffect((): void => {
    const init = async (): Promise<void> => {
      CustomerAxios._setToken(auth);

      try {
        const customer = await CustomerAxios.getMe() as CustomerDbTableType;
        if (customer) {
          setCustomer(customer);
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
        // エラーハンドリングに関する処理が必要な場合はここに記述
      }
    };

    init();
  }, [ auth ]); // authが変更された場合にのみ実行

  return customer;
};

export default useAuth;
