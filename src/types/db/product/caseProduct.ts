import { ProductDbTableType } from "@/types/db/product/product";

export type CaseProductDbTableType = {
  id: number | null;
  parentProductId: number | null;
  childProductId: number | null;
  quantity: number | null;
  childProduct: ProductDbTableType | null;
};
