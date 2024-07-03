import { CustomerSubMenuDbTableType } from "@/types/db/menu/customerSubMenu";
import { CustomerMainMenuDbTableType } from "@/types/db/menu/customerMainMenu";

export type CustomerAuthMenuValueDbTableType = {
  id: number;
  mainMenuId: number;
  mainMenu: CustomerMainMenuDbTableType;
  subMenuId: number | null;
  subMenu: CustomerSubMenuDbTableType | null;
  createdAt: string;
  createdOn: string;
  updatedAt?: string;
  updatedOn?: string;
  deletedAt?: string;
  deletedOn?: string;
};
