"use client";

import { ShipFromAddressDbTableType } from "@/types/db/shipFromAddress";
import { useCallback, useState } from "react";
import { routes } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

interface ApiResponse {
  body: {
    shipFromAddresses: ShipFromAddressDbTableType[];
  };
}

const useIndex = (): {
  shipFromAddresses: ShipFromAddressDbTableType[];
  getShipFromAddresses: () => Promise<void>;
  options: ReactSelectOption[];
} => {
  const auth = useRecoilValue(CustomerState);
  const [ shipFromAddresses, setShipFromAddresses ] = useState<ShipFromAddressDbTableType[]>([]);

  const [ options, setOptions ] = useState<ReactSelectOption[]>([]);

  const getShipFromAddresses = useCallback(async (): Promise<void> => {
    CustomerAxios._setToken(auth);
    try {
      const response = await CustomerAxios.get<ApiResponse>({
        uri: routes.api.customer.shipFromAddress.index.url,
      });
      const shipFromAddresses = response.data.body.shipFromAddresses;

      setOptions(prevState => {
        if (!prevState || !shipFromAddresses) return [];
        return shipFromAddresses.map((shipFromAddress): ReactSelectOption => {
          return {
            label: shipFromAddress.name,
            value: shipFromAddress.id,
          } as ReactSelectOption;
        });
      });
      setShipFromAddresses(prevState => shipFromAddresses);
    } catch (error) {
      CustomerAxios.showErrors(error);
    }
  }, [ auth ]);

  return { shipFromAddresses, getShipFromAddresses, options };
};

export { useIndex };
