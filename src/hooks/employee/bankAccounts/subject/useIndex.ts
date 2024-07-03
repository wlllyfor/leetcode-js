"use client";

import EmployeeAxios from "@/lib/axios/employee-axios";
import { routes } from "@/routes";
import type { SubjectDbTableType } from "@/types/db/bankAccounts/SubjectDbTableType";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { useCallback, useState } from "react";

interface ApiResponse {
  body: {
    subjects: SubjectDbTableType[];
  };
}

/** 科目一覧 */
export const useIndex = (): {
  subjects: SubjectDbTableType[];
  getSubjects: () => Promise<void>;
  options: ReactSelectOption[];
} => {
  const [ subjects, setSubjects ] = useState<SubjectDbTableType[]>([]);
  const [ options, setOptions ] = useState<ReactSelectOption[]>([]);

  const getSubjects = useCallback(async (): Promise<void> => {
    try {
      const response = await EmployeeAxios.get<ApiResponse>({
        uri: routes.api.employee.subject.index.url,
      });

      const results = response.data.body.subjects as SubjectDbTableType[];
      const filteredResults = results.filter(subject => subject.is_profit === 0);

      setSubjects(prevState => filteredResults);
      setOptions(prevState => {
        if(!filteredResults) {
          return prevState;
        }
        return filteredResults.map(payment => {
          return {
            value: payment.id,
            label: payment.name,
          };
        });
      });
    } catch (error) {
      EmployeeAxios.showErrors(error);
    }
  }, []);
  return { subjects, getSubjects, options };
};
