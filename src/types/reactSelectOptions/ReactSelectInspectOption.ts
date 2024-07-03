import { ReceiveStockDetailDbTableType } from "@/types/db/receiveStock/receiveStockDetail";

export type ReactSelectInspectOption = {
  value: number | string;
  label: string;
  receiveStockDetail: ReceiveStockDetailDbTableType | null;
};

export const defaultReactSelectInspectOption: ReactSelectInspectOption = {
  value: 0,
  label: "",
  receiveStockDetail: null,
};
