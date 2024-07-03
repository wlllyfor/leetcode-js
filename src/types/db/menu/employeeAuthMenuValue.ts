import { EmployeeMainMenuDbTableType } from "@/types/db/menu/employeeMainMenu";
import { EmployeeSubMenuDbTableType } from "@/types/db/menu/employeeSubMenu";

export type EmployeeAuthMenuValueDbTableType = {
  id: number;
  mainMenuId: number;
  mainMenu: EmployeeMainMenuDbTableType;
  subMenuId: number | null;
  subMenu: EmployeeSubMenuDbTableType | null;
  createdAt: string;
  createdOn: string;
  updatedAt?: string;
  updatedOn?: string;
  deletedAt?: string;
  deletedOn?: string;
};
