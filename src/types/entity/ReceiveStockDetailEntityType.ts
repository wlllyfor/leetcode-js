import { ReceiveStockDetailDbTableType } from "@/types/db/receiveStock/receiveStockDetail";

export type ReceiveStockDetailEntityType = {
  uuid: string;
  receiveStockDetail: ReceiveStockDetailDbTableType;
  receiveStockQuantity: number;
};
