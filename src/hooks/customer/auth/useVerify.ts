"use client";

import { CustomerDbTableType } from "@/types/db/customer";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";
import { Dispatch, SetStateAction, useState } from "react";

interface ApiResponse {
  body: { customer: CustomerDbTableType; };
}

const useVerify = (): {
  verify: (hubCode: string) => Promise<{ customer: CustomerDbTableType; } | undefined>;
  validationErrors: string[];
  setValidationErrors: Dispatch<SetStateAction<string[]>>;
} => {
  const [ validationErrors, setValidationErrors ] = useState<string[]>([]);

  const verify = async (token: string) => {
    try {
      const response = await GuestAxios.post<ApiResponse>({
        uri: routes.api.customer.auth.verify.url,
        body: {
          token: token,
        },
      });

      return response.data.body as { customer: CustomerDbTableType; };
    } catch (error) {
      GuestAxios.showErrors(error);
      const validationErrors = GuestAxios.get422Errors(error);
      setValidationErrors(prevState => validationErrors);
    }
  };

  return { verify, validationErrors, setValidationErrors };
};

export { useVerify };
