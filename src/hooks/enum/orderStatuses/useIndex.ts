"use client";

import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { useCallback, useState } from "react";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";
import { EnumOrderStatus } from "@/types/enum/enumOrderStatus";

interface ApiResponse {
  body: {
    orderStatuses: {
      labels: EnumOrderStatus;
    };
  };
}

const useIndex = (): {
  getEnums: (actor: "customer" | "employee" | "all") => void;
  enums: ReactSelectOption[];
} => {
  const [ enums, setEnums ] = useState<ReactSelectOption[]>([]);

  const getEnums = useCallback(async (actor: "customer" | "employee" | "all") => {
    try {
      const response = await GuestAxios.get<ApiResponse>({
        uri: routes.api.guest.enum.orderStatus.index.url,
        params: {
          actor: actor,
        },
      });
      const enums = response.data.body.orderStatuses.labels as EnumOrderStatus;
      if (actor === "customer") {
        const options = [
          {
            value: "unProcessed",
            label: enums.unProcessed,
          },
          {
            value: "canceling",
            label: enums.canceling,
          },
          {
            value: "waitForPay",
            label: enums.waitForPay,
          },
        ] as ReactSelectOption[];
        setEnums(prevState => options);
      } else {
        const options = [
          {
            value: "unProcessed",
            label: enums.unProcessed,
          },
          {
            value: "canceling",
            label: enums.canceling,
          },
          {
            value: "canceled",
            label: enums.canceled,
          },
          {
            value: "outOfStock",
            label: enums.outOfStock,
          },
          {
            value: "waitForPay",
            label: enums.waitForPay,
          },
          {
            value: "inCart",
            label: enums.inCart,
          },
        ] as ReactSelectOption[];
        setEnums(prevState => options);
      }
    } catch (error) {
      GuestAxios.showErrors(error);
    }
  }, []);

  return { getEnums, enums };
};

export { useIndex };
