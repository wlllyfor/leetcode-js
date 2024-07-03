"use client";

import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { useCallback, useState } from "react";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";
import { EnumReceiveStockType } from "@/types/enum/enumReceiveStockType";

interface ApiResponse {
  body: {
    receiveStatuses: {
      labels: EnumReceiveStockType;
    };
  };
}

const useIndex = (): { getEnums: () => void; enums: ReactSelectOption[]; } => {
  const [ enums, setEnums ] = useState<ReactSelectOption[]>([]);

  const getEnums = useCallback(async (): Promise<void> => {
    try {
      const response = await GuestAxios.get<ApiResponse>({
        uri: routes.api.guest.enum.receiveStock.index.url,
      });
      const enums = response.data.body.receiveStatuses.labels as EnumReceiveStockType;
      const options = [
        {
          value: "wait",
          label: enums.wait,
        },
        {
          value: "receiving",
          label: enums.receiving,
        },
        {
          value: "received",
          label: enums.received,
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
