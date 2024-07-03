"use client";

import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { useCallback, useState } from "react";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";
import { EnumStockCreateStatus } from "@/types/enum/enumStockCreateStatus";

interface ApiResponse {
  body: {
    stockCreateStatuses: {
      labels: EnumStockCreateStatus;
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
        uri: routes.api.guest.enum.stockCreateStatus.index.url,
      });
      const enums = response.data.body.stockCreateStatuses.labels as EnumStockCreateStatus;
      const options = [
        {
          value: "notYet",
          label: enums.notYet,
        },
        {
          value: "createdReceiveStock",
          label: enums.createdReceiveStock,
        },
        {
          value: "createdLeaveStock",
          label: enums.createdLeaveStock,
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
