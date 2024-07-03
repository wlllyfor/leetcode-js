"use client";

import { useCallback, useState } from "react";
import GuestAxios from "@/lib/axios/guest-axios";
import { routes } from "@/routes";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { JobPositionDbTableType } from "@/types/db/jobPosition";

interface ApiResponse {
  body: {
    jobPositions: JobPositionDbTableType[];
  };
}

const useIndex = (): {
  jobPositions: JobPositionDbTableType[];
  getJobPositions: () => Promise<void>;
  jobPositionOptions: ReactSelectOption[];
} => {
  const [ jobPositions, setJobPositions ] = useState<JobPositionDbTableType[]>([]);

  const [ jobPositionOptions, setJobPositionOptions ] = useState<ReactSelectOption[]>([]);

  const getJobPositions = useCallback(async (): Promise<void> => {
    try {
      const response = await GuestAxios.get<ApiResponse>({
        uri: routes.api.guest.common.jobPosition.index.url,
      });

      const jobPositions = response.data.body.jobPositions as JobPositionDbTableType[];
      setJobPositions(prevState => jobPositions);
      setJobPositionOptions(prevState => {
        return jobPositions.map(jobPosition => {
          return {
            value: jobPosition.id,
            label: jobPosition.name,
          };
        });
      });
    } catch (error) {
      GuestAxios.showErrors(error);
    }
  }, []);

  return { jobPositions, getJobPositions, jobPositionOptions };
};

export { useIndex };
