"use client";

import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { useCallback, useState } from "react";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";
import { EnumDebitStatus } from "@/types/enum/enumDebitStatus";

interface ApiResponse {
  body: {
    debitStatuses: {
      labels: EnumDebitStatus;
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
        uri: routes.api.guest.enum.debitStatus.index.url,
      });
      const enums = response.data.body.debitStatuses.labels as EnumDebitStatus;
      const options = [
        {
          value: "done",
          label: enums.done,
        },
        {
          value: "leave",
          label: enums.leave,
        },
        {
          value: "notYetDebited",
          label: enums.notYetDebited,
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
