"use client";

import { ShipToAddressDbTableType } from "@/types/db/shipToAddress";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    shipToAddresses: ShipToAddressDbTableType[];
  };
}

type ShipToAddressIndexConditionType = {
  customerId: number | null;
};

const useIndex = (): {
  shipToAddresses: ShipToAddressDbTableType[];
  getShipToAddresses: () => Promise<void | ShipToAddressDbTableType[]>;
  options: ReactSelectOption[];
  setOptions: Dispatch<SetStateAction<ReactSelectOption[]>>;
  condition: ShipToAddressIndexConditionType;
  setCondition: Dispatch<SetStateAction<ShipToAddressIndexConditionType>>;
} => {
  const auth = useRecoilValue(EmployeeState);
  const [ shipToAddresses, setShipToAddresses ] = useState<ShipToAddressDbTableType[]>([]);

  // 検索条件
  const [ condition, setCondition ] = useState<ShipToAddressIndexConditionType>({
    customerId: null,
  });

  const [ options, setOptions ] = useState<ReactSelectOption[]>([]);

  const getShipToAddresses = useCallback(async (): Promise<void> => {
    EmployeeAxios._setToken(auth);

    const params = {
      customerId: condition.customerId,
    };

    try {
      const response = await EmployeeAxios.get<ApiResponse>({
        uri: routes.api.employee.shipToAddress.index.url,
        params: Str.decamelizeKeys(params),
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
      EmployeeAxios.showErrors(error);
    }
  }, [ auth, condition.customerId ]);

  return {
    shipToAddresses,
    getShipToAddresses,
    options,
    setOptions,
    condition,
    setCondition,
  };
};

export { useIndex };
