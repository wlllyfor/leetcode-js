import { CustomerDbTableType } from "@/types/db/customer";
import { HubDbTableType } from "@/types/db/hub";
import { MallProductDbType } from "@/types/db/order/mallProduct";

export type CustomerCartDbType = {
  id: number | null;
  customerId: number | null;
  productId: string;
  mallProductId: number | null;
  unitPrice: number;
  quantity: number;
  createdAt: Date | null;
  updatedAt: Date | null;

  // not model
  createdOn: string;
  updatedOn: string;
  mallToShowHeader: boolean;

  // relation
  customer: CustomerDbTableType | null;
  hub: HubDbTableType;
  mallProduct: MallProductDbType;
};
