"use client";

import { ShipToAddressDbTableType } from "@/types/db/shipToAddress";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

interface ApiResponse {
  body: {
    shipToAddresses: ShipToAddressDbTableType[];
  };
}

const useIndex = (): {
  shipToAddresses: ShipToAddressDbTableType[];
  getShipToAddresses: () => Promise<void | ShipToAddressDbTableType[]>;
  options: ReactSelectOption[];
  setOptions: Dispatch<SetStateAction<ReactSelectOption[]>>;
} => {
  const auth = useRecoilValue(CustomerState);
  const [ shipToAddresses, setShipToAddresses ] = useState<ShipToAddressDbTableType[]>([]);

  const [ options, setOptions ] = useState<ReactSelectOption[]>([]);

  const getShipToAddresses = useCallback(async (): Promise<void> => {
    CustomerAxios._setToken(auth);
    try {
      const response = await CustomerAxios.get<ApiResponse>({
        uri: routes.api.customer.shipToAddress.index.url,
      });
      const shipToAddresses = response.data.body.shipToAddresses as ShipToAddressDbTableType[];

      setOptions(prevState => {
        if (!prevState || !shipToAddresses) return [];
        return shipToAddresses.map((shipToAddress): ReactSelectOption => {
          return {
            label: shipToAddress.name,
            value: shipToAddress.id,
          } as ReactSelectOption;
        });
      });
      setShipToAddresses(prevState => shipToAddresses);
    } catch (error) {
      CustomerAxios.showErrors(error);
    }
  }, [ auth ]);

  return { shipToAddresses, getShipToAddresses, options, setOptions };
};

export { useIndex };
