import { JobPositionDbTableType } from "@/types/db/jobPosition";
import { CustomerAuthMenuValueDbTableType } from "@/types/db/menu/customerAuthMenuValue";

export type CustomerAuthMenuKeyDbTableType = {
  id: number;
  hubId: number;
  jobPositionId: number | null;
  jobPosition: JobPositionDbTableType | null;
  customerAuthMenuValues: CustomerAuthMenuValueDbTableType[];
  createdAt: string;
  createdOn: string;
  updatedAt?: string;
  updatedOn?: string;
};
