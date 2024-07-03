import { ChangeEvent, MouseEvent } from "react";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";

export type TableGroupType = {
  handleEditButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
  orderDetails: OrderDetailDbTableType[];
  checkedOrderDetails: OrderDetailDbTableType[];
  handleOnChecked: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
};
