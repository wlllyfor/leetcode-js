"use client";

import { ShipFromAddressDbTableType } from "@/types/db/shipFromAddress";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import EmployeeAxios from "@/lib/axios/customer-axios";
import { useRecoilValue } from "recoil";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import { Str } from "@/lib/Str";

interface ApiResponse {
  body: {
    shipFromAddresses: ShipFromAddressDbTableType[];
  };
}

type ShipFromAddressIndexConditionType = {
  customerId: number | null;
};

const useIndex = (): {
  shipFromAddresses: ShipFromAddressDbTableType[];
  getShipFromAddresses: () => Promise<void>;
  options: ReactSelectOption[];
  condition: ShipFromAddressIndexConditionType;
  setCondition: Dispatch<SetStateAction<ShipFromAddressIndexConditionType>>;
} => {
  const auth = useRecoilValue(EmployeeState);
  const [ shipFromAddresses, setShipFromAddresses ] = useState<ShipFromAddressDbTableType[]>([]);

  // 検索条件
  const [ condition, setCondition ] = useState<ShipFromAddressIndexConditionType>({
    customerId: null,
  });

  const [ options, setOptions ] = useState<ReactSelectOption[]>([]);

  const getShipFromAddresses = useCallback(async (): Promise<void> => {
    EmployeeAxios._setToken(auth);

    const params = {
      customerId: condition.customerId,
    };

    try {
      const response = await EmployeeAxios.get<ApiResponse>({
        uri: routes.api.employee.shipFromAddress.index.url,
        params: Str.decamelizeKeys(params),
      });
      const shipFromAddresses = response.data.body.shipFromAddresses as ShipFromAddressDbTableType[];

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
      EmployeeAxios.showErrors(error);
    }
  }, [ auth, condition.customerId ]);

  return {
    shipFromAddresses,
    getShipFromAddresses,
    options,
    condition,
    setCondition,
  };
};

export { useIndex };
