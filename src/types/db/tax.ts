import { HubDbTableType } from "@/types/db/hub";

export type TaxDbTableType = {
  id: number;
  hubId: number;
  name: string;
  startedOn: string;
  rate: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  // relation
  hub: HubDbTableType;

  // other
  createdOn: string;
  updatedOn: string;
};
