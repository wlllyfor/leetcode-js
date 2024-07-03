import { MouseEvent } from "react";
import { CustomerDbTableType } from "@/types/db/customer";

export type TableGroupType = {
  customers: CustomerDbTableType[];
  handleEditButtonOnClick: (event: MouseEvent<HTMLButtonElement>) => void;
};
