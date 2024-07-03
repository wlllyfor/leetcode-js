"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { JobPositionDbTableType } from "@/types/db/jobPosition";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";

interface ApiResponse {
  body: {
    jobPosition: JobPositionDbTableType;
  };
}

/** 役職: 1件取得 */
const useFind = (): {
  jobPosition: JobPositionDbTableType | null;
  getJobPosition: () => Promise<void | (JobPositionDbTableType | null)>;
  setJobPosition: Dispatch<SetStateAction<JobPositionDbTableType | null>>;
  id: number | null;
  setId: Dispatch<SetStateAction<number | null>>;
} => {
  const [ jobPosition, setJobPosition ] = useState<JobPositionDbTableType | null>(null);

  // 検索条件
  const [ id, setId ] = useState<number | null>(null);

  const getJobPosition = useCallback(async (): Promise<void | JobPositionDbTableType> => {
    try {
      const response = await GuestAxios.get<ApiResponse>({
        uri: routes.api.guest.common.jobPosition.find.url,
        params: {
          id: id,
        },
      });
      const jobPosition = response.data.body.jobPosition as JobPositionDbTableType;
      setJobPosition(prevState => jobPosition);
      return jobPosition;
    } catch (error) {
      GuestAxios.showErrors(error);
    }
  }, [ id ]);

  return { jobPosition, setJobPosition, getJobPosition, id, setId };
};

export { useFind };
