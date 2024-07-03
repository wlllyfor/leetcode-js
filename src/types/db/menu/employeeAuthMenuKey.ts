import { EmployeeAuthMenuValueDbTableType } from "@/types/db/menu/employeeAuthMenuValue";
import { JobPositionDbTableType } from "@/types/db/jobPosition";

export type EmployeeAuthMenuKeyDbTableType = {
  id: number;
  hubId: number;
  jobPositionId: number | null;
  jobPosition: JobPositionDbTableType | null;
  employeeAuthMenuValues: EmployeeAuthMenuValueDbTableType[];
  createdAt: string;
  createdOn: string;
  updatedAt?: string;
  updatedOn?: string;
};
