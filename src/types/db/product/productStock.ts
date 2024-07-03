import { ProductDbTableType } from "@/types/db/product/product";

export type ProductStockType = {
  uuid: string;
  id: number | null;
  receiveStockDetailId: number | null;
  productId: number | null;
  status: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;

  createdOn: string | null;
  updatedOn: string | null;

  // relation
  product: ProductDbTableType | null;
  statusLabel: string;
};
