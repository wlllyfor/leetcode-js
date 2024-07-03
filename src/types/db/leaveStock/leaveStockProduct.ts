import { ProductDbTableType } from "@/types/db/product/product";

export type LeaveStockProductDbTableType = {
  uuid: string;
  id: number | null;
  leaveStockId: number;
  requestedLeaveQuantity: number | null;
  locationCode: string;

  createdAt: Date | null;
  updatedAt: Date | null;

  // relation
  product: ProductDbTableType;
};
