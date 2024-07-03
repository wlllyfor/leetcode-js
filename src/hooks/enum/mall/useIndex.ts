"use client";

import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { useCallback, useState } from "react";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";
import { EnumMall } from "@/types/enum/enumMall";

interface ApiResponse {
  body: {
    malls: {
      labels: EnumMall;
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
        uri: routes.api.guest.enum.mall.index.url,
      });
      const enums = response.data.body.malls.labels as EnumMall;
      const options = [
        {
          value: "alibaba",
          label: enums.alibaba,
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
