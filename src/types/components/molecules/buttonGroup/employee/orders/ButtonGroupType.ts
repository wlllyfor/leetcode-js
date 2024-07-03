import { MouseEvent } from "react";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";

export type ButtonGroupType = {
  checkedOrderDetails: OrderDetailDbTableType[];
  orderSortOptions: ReactSelectOption[];
  handleEditButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleWithdrawalButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleCartButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleRefundButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleCancelButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleArrivalRequestButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleShippingOrderButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
};
