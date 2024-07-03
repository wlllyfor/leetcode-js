"use client";

import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { useCallback, useState } from "react";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";
import { EnumCustomerStatus } from "@/types/enum/enumCustomerStatus";

interface ApiResponse {
  body: {
    customerStatuses: {
      labels: EnumCustomerStatus;
    };
  };
}

const useIndex = (): {
  getEnums: () => void;
  enums: ReactSelectOption[];
} => {
  const [ enums, setEnums ] = useState<ReactSelectOption[]>([]);

  const getEnums = useCallback(async () => {
    try {
      const response = await GuestAxios.get<ApiResponse>({
        uri: routes.api.guest.enum.customerStatus.index.url,
      });
      const enums = response.data.body.customerStatuses.labels as EnumCustomerStatus;
      const options = [
        {
          value: "using",
          label: enums.using,
        },
        {
          value: "adjourn",
          label: enums.adjourn,
        },
        {
          value: "withdraw",
          label: enums.withdraw,
        },
        {
          value: "error",
          label: enums.error,
        },
      ] as ReactSelectOption[];
      setEnums(prevState => options);
    } catch (error) {
      GuestAxios.showErrors(error);
    }
  }, []);

  return { getEnums, enums };
};

export { useIndex };
