import { ChangeEvent } from "react";
import { CustomerCartDbType } from "@/types/db/customerCart";

export type TableHeadMallNameType = {
  id: string;
  defaultChecked: boolean;
  handleCheckboxOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  minWidth?: string;
  customerCart: CustomerCartDbType;
};
