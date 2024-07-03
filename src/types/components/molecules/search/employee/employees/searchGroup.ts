import { FilterConditionType } from "@/hooks/employee/employees/useEmployeesFilter";
import { EmployeeDbTableType } from "@/types/db/employee";
import { HubDbTableType } from "@/types/db/hub";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { Dispatch, SetStateAction } from "react";

/** スタッフマスタの絞り込みパネルで使用する型 */
export type SearchGroupPropsType = {
  employees: EmployeeDbTableType[];
  hubs: {
    allHubs: HubDbTableType[];
    options: ReactSelectOption[] | [];
    defaultOption: ReactSelectOption[] | null;
  };
  groups: {
    defaultOption: ReactSelectOption[] | null;
  };
  jobPositions: {
    options: ReactSelectOption[] | null;
    selectOption: ReactSelectOption[] | null;
    checked: boolean;
    changeMultiFunction: (value: ReactSelectOption[] | null) => void;
    changeCheckFunction: (checked: boolean) => void;
    setSelectJobPosition: Dispatch<SetStateAction<ReactSelectOption[] | null>>;
  };
  name: {
    filteredName: string;
    setFilteredName: Dispatch<SetStateAction<string>>;
  };
  nameKana: {
    filteredNameKana: string;
    setFilteredNameKana: Dispatch<SetStateAction<string>>;
  };
  staffId: {
    filteredStaffId: string;
    setFilteredStaffId: Dispatch<SetStateAction<string>>;
  };
  filterFunction: (condition: FilterConditionType) => void;
}
