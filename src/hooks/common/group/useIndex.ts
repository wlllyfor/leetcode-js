"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { GroupDbTableType } from "@/types/db/group";

interface ApiResponse {
  body: {
    groups: GroupDbTableType[];
  };
}

type GroupIndexConditionType = {
  hubIdList: number[] | null;
};

const useIndex = (): {
  groups: GroupDbTableType[];
  getGroups: () => Promise<void>;
  options: ReactSelectOption[];
  condition: GroupIndexConditionType;
  setCondition: Dispatch<SetStateAction<GroupIndexConditionType>>;
} => {
  const [ groups, setGroups ] = useState<GroupDbTableType[]>([]);

  const [ options, setOptions ] = useState<ReactSelectOption[]>([]);

  const [ condition, setCondition ] = useState<GroupIndexConditionType>({
    hubIdList: [],
  });

  const getGroups = useCallback(async (): Promise<void> => {
    try {
      if (condition.hubIdList) {
        const response = await GuestAxios.get<ApiResponse>({
          uri: routes.api.guest.common.group.index.url,
          params: {
            hub_id_list: condition.hubIdList.join(","),
          },
        });

        const groups = response.data.body.groups as GroupDbTableType[];
        setGroups(prevState => groups);
        setOptions(prevState => {
          return groups.map(group => {
            return {
              value: group.id,
              label: group.name,
            };
          });
        });
      }
    } catch (error) {
      GuestAxios.showErrors(error);
    }
  }, [ condition.hubIdList ]);

  return { groups, getGroups, options, condition, setCondition };
};

export { useIndex };
