import { ProductDbTableType } from "@/types/db/product/product";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";

export type ReceiveStockDetailDbTableType = {
  uuid: string;
  id: number | null;
  receiveStockId: number;
  productId: number;

  /**
   * 入庫依頼数
   */
  requestedReceiveQuantity: number;

  /**
   * 検品数
   */
  inspectedQuantity: number;

  /**
   * 入庫数
   */
  receiveQuantity: number;
  status: string;

  createdAt: Date | null;
  updatedAt: Date | null;

  // not model
  statusLabel: string;

  // relation
  product: ProductDbTableType;
  receiveStock: ReceiveStockDbTableType;
};
