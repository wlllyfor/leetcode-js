"use client";

import { ShipToAddressDbTableType } from "@/types/db/shipToAddress";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes, setIdPathParam } from "@/routes";
import { useRecoilValue } from "recoil";
import { defaultReactSelectOption, ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { Str } from "@/lib/Str";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { EmployeeState } from "@/store/Auth/EmployeeState";

interface ApiResponse {
  body: {
    shipToAddress: ShipToAddressDbTableType;
  };
}

type ShipToAddressFindConditionType = {
  customerId: number | null;
};

const useFind = (): {
  shipToAddress: ShipToAddressDbTableType | undefined;
  findShipToAddress: (id: number) => Promise<void>;
  countryOption: ReactSelectOption;
  condition: ShipToAddressFindConditionType;
  setCondition: Dispatch<SetStateAction<ShipToAddressFindConditionType>>;
} => {
  const auth = useRecoilValue(EmployeeState);
  const [ shipToAddress, setShipToAddress ] = useState<ShipToAddressDbTableType>();

  const [ countryOption, setCountryOption ] = useState<ReactSelectOption>(defaultReactSelectOption);

  // 検索条件
  const [ condition, setCondition ] = useState<ShipToAddressFindConditionType>({
    customerId: null,
  });

  const findShipToAddress = useCallback(
    async (id: number): Promise<void> => {
      EmployeeAxios._setToken(auth);

      const params = {
        id: id,
        customerId: condition.customerId,
      };

      try {
        const response = await EmployeeAxios.get<ApiResponse>({
          uri: setIdPathParam(id, routes.api.employee.shipToAddress.find.url),
          params: Str.decamelizeKeys(params),
        });

        const foundShipToAddress = response.data.body.shipToAddress as ShipToAddressDbTableType;

        await setShipToAddress(prevState => foundShipToAddress);
        setCountryOption(prevState => {
          return {
            value: foundShipToAddress.countryId,
            label: foundShipToAddress.country?.name,
          } as ReactSelectOption;
        });
      } catch (error) {
        EmployeeAxios.showErrors(error);
      }
    },
    [ auth, condition.customerId ],
  );

  return {
    shipToAddress,
    findShipToAddress,
    countryOption,
    condition,
    setCondition,
  };
};

export { useFind };
