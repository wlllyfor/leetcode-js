"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { HubDbTableType } from "@/types/db/hub";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";

interface ApiResponse {
  body: {
    hub: HubDbTableType;
  };
}

const useFind = (): {
  hub: HubDbTableType | null;
  getHub: () => Promise<void | (HubDbTableType | null)>;
  setHub: Dispatch<SetStateAction<HubDbTableType | null>>;
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  id: number | null;
  setId: Dispatch<SetStateAction<number | null>>;
} => {
  const [ hub, setHub ] = useState<HubDbTableType | null>(null);

  // 検索条件
  const [ code, setCode ] = useState<string>("");
  const [ id, setId ] = useState<number | null>(null);

  const getHub = useCallback(async (): Promise<void | HubDbTableType> => {
    try {
      const response = await GuestAxios.get<ApiResponse>({
        uri: routes.api.guest.common.hub.find.url,
        params: {
          code: code,
          id: id,
        },
      });
      const hub = response.data.body.hub as HubDbTableType;
      setHub(prevState => hub);
      return hub;
    } catch (error) {
      GuestAxios.showErrors(error);
    }
  }, [ code, id ]);

  return { hub, setHub, getHub, code, setCode, id, setId };
};

export { useFind };
