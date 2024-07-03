"use client";

import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { useCallback, useState } from "react";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";
import { EnumOrderSort } from "@/types/enum/enumOrderSort";

interface ApiResponse {
  body: {
    orderSorts: {
      labels: EnumOrderSort;
    };
  };
}

const useIndex = (): {
  getEnums: () => void;
  enums: ReactSelectOption[];
  defaultOption: ReactSelectOption | null;
} => {
  const [ enums, setEnums ] = useState<ReactSelectOption[]>([]);
  const [ defaultOption, setDefaultOption ] = useState<ReactSelectOption | null>(null);

  const getEnums = useCallback(async (): Promise<void> => {
    try {
      const response = await GuestAxios.get<ApiResponse>({
        uri: routes.api.guest.enum.orderSort.index.url,
      });
      const enums = response.data.body.orderSorts.labels as EnumOrderSort;
      const options = [
        {
          value: "created_at_desc",
          label: enums.createdAtDesc,
        },
        {
          value: "created_at_asc",
          label: enums.createdAtAsc,
        },
        {
          value: "id_asc",
          label: enums.idAsc,
        },
        {
          value: "id_desc",
          label: enums.idDesc,
        },
      ] as ReactSelectOption[];

      setDefaultOption(prevState => {
        return {
          value: "created_at_desc",
          label: enums.createdAtDesc,
        };
      });
      setEnums(prevState => options);
    } catch (error) {
      GuestAxios.showErrors(error);
    }
  }, []);

  return { getEnums, enums, defaultOption };
};

export { useIndex };
