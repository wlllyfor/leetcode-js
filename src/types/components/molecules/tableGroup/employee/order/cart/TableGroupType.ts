import { Dispatch, MouseEvent, SetStateAction } from "react";
import { EmployeeCartDbType } from "@/types/db/employeeCart";

export type TableGroupType = {
  handleEditButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
  employeeCartEntities: (EmployeeCartDbType & {
    uuid: string;
    checked: boolean;
  })[];
  setEmployeeCartEntities: Dispatch<SetStateAction<(EmployeeCartDbType & {
    uuid: string;
    checked: boolean;
  })[]>>;
};
