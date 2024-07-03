"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { CustomerCartDbType } from "@/types/db/customerCart";
import { Str } from "@/lib/Str";
import { Integer } from "@/lib/integer";

interface ApiResponse {
  body: {
    customerCarts: CustomerCartDbType[];
  };
}

type CustomerCartIndexConditionType = {
  isMyselfProducts: boolean;
};

const useIndex = (): {
  customerCarts: CustomerCartDbType[];
  setCustomerCarts: Dispatch<SetStateAction<CustomerCartDbType[]>>;
  getCustomerCarts: () => Promise<void>;
  condition: CustomerCartIndexConditionType;
  setCondition: Dispatch<SetStateAction<CustomerCartIndexConditionType>>;
} => {
  const auth = useRecoilValue(CustomerState);
  const [ customerCarts, setCustomerCarts ] = useState<CustomerCartDbType[]>([]);

  // 検索条件
  const [ condition, setCondition ] = useState<CustomerCartIndexConditionType>({
    isMyselfProducts: true,
  });

  const getCustomerCarts = useCallback(async (): Promise<void> => {
    CustomerAxios._setToken(auth);

    const params = {
      isMyselfProducts: Integer.boolToInteger(condition.isMyselfProducts),
    };

    try {
      const response = await CustomerAxios.get<ApiResponse>({
        uri: routes.api.customer.order.cart.index.url,
        params: Str.decamelizeKeys(params),
      });

      const customerCarts = response.data.body.customerCarts as CustomerCartDbType[];
      setCustomerCarts(prevState => customerCarts);
    } catch (error) {
      CustomerAxios.showErrors(error);
    }
  }, [ auth, condition ]);

  return {
    customerCarts,
    setCustomerCarts,
    getCustomerCarts,
    condition,
    setCondition,
  };
};

export { useIndex };
