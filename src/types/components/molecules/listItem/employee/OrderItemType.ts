import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";
import { Dispatch, SetStateAction } from "react";

export type OrderItemType = {
  orderDetail: OrderDetailDbTableType;
  handleOnChangeChecks: (checked: boolean, id: number) => Promise<void>;
  setSelectedOrderDetail: Dispatch<SetStateAction<OrderDetailDbTableType | null>>;
  handleOnClickOpenEditModal: () => void;
  handleOnClickOpenDeleteModal: () => void;
  handleOnClickReceiveStockButton: () => void;
  handleOnClickLeaveStockButton: () => void;
};
