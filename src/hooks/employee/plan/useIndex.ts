"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { routes } from "@/routes";
import { useRecoilValue } from "recoil";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { EmployeeState } from "@/store/Auth/EmployeeState";
import EmployeeAxios from "@/lib/axios/employee-axios";
import { Str } from "@/lib/Str";
import { PlanDbType } from "@/types/db/plan";

interface ApiResponse {
  body: {
    plans: PlanDbType[];
  };
}

type OrderIndexConditionType = {
  hubOptions: ReactSelectOption[];
};
const useIndex = (): {
  plans: PlanDbType[];
  getPlans: () => Promise<void>;
  planOptions: ReactSelectOption[];
  getPlansOptions: () => Promise<void>;
  condition: OrderIndexConditionType;
  setCondition: Dispatch<SetStateAction<OrderIndexConditionType>>;
} => {
  const auth = useRecoilValue(EmployeeState);
  const [ plans, setPlans ] = useState<PlanDbType[]>([]);
  const [ planOptions, setPlanOptions ] = useState<ReactSelectOption[]>([]);

  // 検索条件
  const [ condition, setCondition ] = useState<OrderIndexConditionType>({
    hubOptions: [],
  });

  const getPlans = useCallback(async (): Promise<void> => {
    EmployeeAxios._setToken(auth);

    const hubIdListValues = condition.hubOptions.map(item => item.value).join(",");
    const params = {
      hubIdList: hubIdListValues,
    };
    try {
      const response = await EmployeeAxios.get<ApiResponse>({
        uri: routes.api.employee.plan.index.url,
        params: Str.decamelizeKeys(params),
      });

      const plans = response.data.body.plans as PlanDbType[];
      setPlans(prevState => plans);
    } catch (error) {
      EmployeeAxios.showErrors(error);
    }
  }, [ auth, condition ]);

  const getPlansOptions = useCallback(async (): Promise<void> => {
    EmployeeAxios._setToken(auth);

    const hubIdListValues = condition.hubOptions.map(item => item.value).join(",");
    const params = {
      hubIdList: hubIdListValues,
    };
    try {
      const response = await EmployeeAxios.get<ApiResponse>({
        uri: routes.api.employee.plan.index.url,
        params: Str.decamelizeKeys(params),
      });

      const plans = response.data.body.plans as PlanDbType[];
      setPlanOptions(prevState => {
        return plans.map(plan => {
          return {
            value: plan.id,
            label: plan.name,
          };
        });
      });
    } catch (error) {
      /* empty */
    }
  }, [ auth, condition.hubOptions ]);

  return {
    plans,
    getPlans,
    planOptions,
    getPlansOptions,
    condition,
    setCondition,
  };
};

export { useIndex };
