"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { TaxDbTableType } from "@/types/db/tax";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

interface ApiResponse {
  body: {
    taxes: TaxDbTableType[];
  };
}

type TaxIndexConditionType = {
  hubList: ReactSelectOption[];
};

const useIndex = (): {
  taxes: TaxDbTableType[];
  getTaxes: () => Promise<void>;
  condition: TaxIndexConditionType;
  setCondition: Dispatch<SetStateAction<TaxIndexConditionType>>;
} => {
  const auth = useRecoilValue(EmployeeState);
  const [ taxes, setTaxes ] = useState<TaxDbTableType[]>([]);// 検索条件
  const [ condition, setCondition ] = useState<TaxIndexConditionType>({
    hubList: [],
  });

  const getTaxes = useCallback(async (): Promise<void> => {
    try {
      EmployeeAxios._setToken(auth);
      const hubIdList = condition.hubList.map(option => option.value)
        .filter(value => typeof value === "number") as number[];
      const response = await EmployeeAxios.get<ApiResponse>({
        uri: routes.api.employee.tax.index.url,
        params: {
          hub_id_list: hubIdList.join(","),
        },
      });

      const hubs = response.data.body.taxes as TaxDbTableType[];
      setTaxes(prevState => hubs);
    } catch (error) {
      EmployeeAxios.showErrors(error);
    }
  }, [ auth, condition ]);

  return { taxes, getTaxes, condition, setCondition };
};

export { useIndex };
