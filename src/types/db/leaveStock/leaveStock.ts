import { CustomerDbTableType } from "@/types/db/customer";
import { LeaveStockProductDbTableType } from "@/types/db/leaveStock/leaveStockProduct";
import { LeaveStockCommissionDbTableType } from "@/types/db/leaveStock/leaveStockCommission";
import { LeaveStockPackDbTableType } from "@/types/db/leaveStock/leaveStockPack";
import { ShipFromAddressDbTableType } from "@/types/db/shipFromAddress";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";
import { CountryDbTableType } from "@/types/db/country";
import { HubDbTableType } from "@/types/db/hub";

export type LeaveStockTableDbType = {
  uuid: string;
  id: number;
  trackingNo: string | null;
  customerId: number;

  /**
   * 作成元入荷データID
   */
  receiveStockId: number | null;

  /**
   * 作成元注文明細ID
   */
  orderDetailId: number | null;

  status: string;

  shipFromAddressId: number;
  countryId: number;

  postalCode: string;
  prefectureName: string;
  cityName: string;
  townName: string;
  buildingName: string;

  // 宛名
  name: string;
  tel: string;

  leaveStartedOn: string;
  leavedOn: string;
  publicRemarks: string | null;
  publicRemarksFilePath: string | null;
  privateRemarks: string | null;
  privateRemarksFilePath: string | null;
  receivedOn: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;

  // not model
  code: string;
  statusLabel: string;
  createdOn: string | null;
  updatedOn: string | null;
  isEditableStatus: boolean;

  // relation
  customer: CustomerDbTableType | null;
  leaveStockProducts: LeaveStockProductDbTableType[];
  leaveStockCommissions: LeaveStockCommissionDbTableType[];
  leaveStockPacks: LeaveStockPackDbTableType[];
  shipFromAddress: ShipFromAddressDbTableType | null;
  receiveStock: ReceiveStockDbTableType | null;
  orderDetail: OrderDetailDbTableType | null;
  country: CountryDbTableType | null;
  hub: HubDbTableType;
};
