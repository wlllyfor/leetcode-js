"use client";

import { ShipToAddressDbTableType } from "@/types/db/shipToAddress";
import { useCallback, useState } from "react";
import { routes, setIdPathParam } from "@/routes";
import CustomerAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { CustomerState } from "@/store/Auth/CustomerState";
import { defaultReactSelectOption, ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

interface ApiResponse {
  body: {
    shipToAddress: ShipToAddressDbTableType;
  };
}

const useFind = (): {
  shipToAddress: ShipToAddressDbTableType | undefined;
  getShipToAddressById: (id: number) => Promise<void>;
  countryOption: ReactSelectOption;
} => {
  const auth = useRecoilValue(CustomerState);
  const [ shipToAddress, setShipToAddress ] = useState<ShipToAddressDbTableType>();

  const [ countryOption, setCountryOption ] = useState<ReactSelectOption>(defaultReactSelectOption);

  const getShipToAddressById = useCallback(
    async (id: number): Promise<void> => {
      CustomerAxios._setToken(auth);

      const uri = setIdPathParam(id, routes.api.customer.shipToAddress.find.url);

      try {
        const response = await CustomerAxios.get<ApiResponse>({
          uri: uri,
        });

        const foundShipToAddress = response.data.body.shipToAddress as ShipToAddressDbTableType;

        setShipToAddress(prevState => foundShipToAddress);
        setCountryOption(prevState => {
          return {
            value: foundShipToAddress.countryId,
            label: foundShipToAddress.country?.name,
          } as ReactSelectOption;
        });
      } catch (error) {
        CustomerAxios.showErrors(error);
      }
    },
    [ auth, setShipToAddress ],
  );

  return { shipToAddress, getShipToAddressById, countryOption };
};

export { useFind };
