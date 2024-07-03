import { CustomerDbTableType } from "@/types/db/customer";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";
import { HubDbTableType } from "@/types/db/hub";

export type OrderTypeDbType = {
  id: number | null;
  customerId: number | null;
  orderType: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;

  // not model
  code: string;
  total: number;
  postageTotal: number;
  otherPriceTotal: number;
  detailCount: number;
  createdOn: string;
  updatedOn: string;

  // relation
  orderDetails: OrderDetailDbTableType | null;
  customer: CustomerDbTableType | null;
  hub: HubDbTableType;
};
