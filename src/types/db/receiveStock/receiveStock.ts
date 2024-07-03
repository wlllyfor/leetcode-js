import { CustomerDbTableType } from "@/types/db/customer";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";
import { ReceiveStockDetailDbTableType } from "@/types/db/receiveStock/receiveStockDetail";
import { ReceiveStockCommissionDbTableType } from "@/types/db/receiveStock/receiveStockCommission";
import { HubDbTableType } from "@/types/db/hub";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";

export type ReceiveStockDbTableType = {
  createdEmployeeBy: string | null | undefined;
  uuid: string;
  id: number | null;
  customerId: number;

  /**
   * 作成元注文明細ID
   */
  orderDetailId: number | null;
  trackingNo: string | null;
  status: string;

  /**
   * 入荷予定日
   */
  expectedArrivedOn: string | null;

  /**
   * 入庫日
   */
  receivedOn: string | null;
  publicRemarks: string | null;
  publicRemarksFilePath: string | null;
  privateRemarks: string | null;
  privateRemarksFilePath: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;

  // not model
  code: string;
  statusLabel: string;
  createdOn: string | null;
  updatedOn: string | null;
  isEditableStatus: boolean;

  // relation
  orderDetail: OrderDetailDbTableType | null;
  customer: CustomerDbTableType | null;
  receiveStockDetails: ReceiveStockDetailDbTableType[];
  receiveStockCommissions: ReceiveStockCommissionDbTableType[];
  leaveStocks: LeaveStockTableDbType | null;
  hub: HubDbTableType;
};
