import { EmployeeDbTableType } from "@/types/db/employee";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";

export type EmployeeCartDbType = {
  id: number | null;
  employeeId: number | null;
  orderDetailId: number | null;

  // not model
  createdOn: string;
  updatedOn: string;
  mallToShowHeader: boolean;
  shopNameToShowHeader: boolean;

  // relation
  employee: EmployeeDbTableType | null;
  orderDetail: OrderDetailDbTableType;
};
