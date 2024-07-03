"use client";

import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { useCallback, useState } from "react";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";
import { EnumLeaveStockType } from "@/types/enum/enumLeaveStockType";

interface ApiResponse {
  body: {
    leaveStatuses: {
      labels: EnumLeaveStockType;
    };
  };
}

const useIndex = (): { getEnums: () => void; enums: ReactSelectOption[]; } => {
  const [ enums, setEnums ] = useState<ReactSelectOption[]>([]);

  const getEnums = useCallback(async (): Promise<void> => {
    try {
      const response = await GuestAxios.get<ApiResponse>({
        uri: routes.api.guest.enum.leaveStock.index.url,
      });
      const enums = response.data.body.leaveStatuses.labels as EnumLeaveStockType;
      const options = [
        {
          value: "wait_leave",
          label: enums.waitLeave,
        },
        {
          value: "wait_receive",
          label: enums.waitReceive,
        },
        {
          value: "leaving",
          label: enums.leaving,
        },
        {
          value: "leaved",
          label: enums.leaved,
        },
        {
          value: "hold",
          label: enums.hold,
        },
        {
          value: "cancelling",
          label: enums.cancelling,
        },
        {
          value: "cancelled",
          label: enums.cancelled,
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
