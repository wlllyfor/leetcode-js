"use client";

import { useCallback, useState } from "react";
import { HubDbTableType } from "@/types/db/hub";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

interface ApiResponse {
  body: {
    hubs: HubDbTableType[];
  };
}

/** 拠点：複数件取得 */
const useIndex = (): {
  hubs: HubDbTableType[];
  getHubs: () => Promise<void>;
  options: ReactSelectOption[];
} => {
  const [ hubs, setHubs ] = useState<HubDbTableType[]>([]);

  const [ hubOptions, setHubOptions ] = useState<ReactSelectOption[]>([]);

  const getHubs = useCallback(async (): Promise<void> => {
    try {
      const response = await GuestAxios.get<ApiResponse>({
        uri: routes.api.guest.common.hub.index.url,
      });

      const hubs = response.data.body.hubs as HubDbTableType[];
      setHubs(prevState => hubs);
      setHubOptions(prevState => {
        return hubs.map(hub => {
          return {
            value: hub.id,
            label: hub.name,
          };
        });
      });
    } catch (error) {
      GuestAxios.showErrors(error);
    }
  }, []);

  return { hubs, getHubs, options: hubOptions };
};

export { useIndex };
