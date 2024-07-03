"use client";

import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { useCallback, useState } from "react";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";
import { EnumReceiveSearchDate } from "@/types/enum/enumReceiveSearchDate";

interface ApiResponse {
  body: {
    receiveSearchDates: {
      labels: EnumReceiveSearchDate;
    };
  };
}

const useIndex = (): {
  getEnums: () => void;
  enums: ReactSelectOption[];
} => {
  const [ enums, setEnums ] = useState<ReactSelectOption[]>([]);

  const getEnums = useCallback(async (): Promise<void> => {
    try {
      const response = await GuestAxios.get<ApiResponse>({
        uri: routes.api.guest.enum.receiveSearchDates.index.url,
      });
      const enums = response.data.body.receiveSearchDates.labels as EnumReceiveSearchDate;
      const options = [
        {
          value: "createdAt",
          label: enums.createdAt,
        },
        {
          value: "expectedArrivedOn",
          label: enums.expectedArrivedOn,
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
