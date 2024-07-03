"use client";

import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { useCallback, useState } from "react";
import { HubDbTableType } from "@/types/db/hub";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";
import { EnumCaseProductType } from "@/types/enum/enumCaseProductType";

interface ApiResponse {
  body: {
    hubs: HubDbTableType[];
    caseProductTypes: {
      labels: EnumCaseProductType;
    };
  };
}

const useIndex = (): { getEnums: () => void; enums: ReactSelectOption[]; } => {
  const [ enums, setEnums ] = useState<ReactSelectOption[]>([]);

  const getEnums = useCallback(() => {
    (async (): Promise<void> => {
      try {
        const response = await GuestAxios.get<ApiResponse>({
          uri: routes.api.guest.enum.caseProductType.index.url,
        });
        const enums = response.data.body.caseProductTypes.labels as EnumCaseProductType;
        const options = [
          {
            value: "all",
            label: enums.all,
          },
          {
            value: "normal",
            label: enums.normal,
          },
          {
            value: "amazon",
            label: enums.amazon,
          },
          {
            value: "company_equipment",
            label: enums.companyEquipment,
          },
        ] as ReactSelectOption[];
        setEnums(prevState => options);
      } catch (error) {
        GuestAxios.showErrors(error);
      }
    })();
  }, []);

  return { getEnums, enums };
};

export { useIndex };
