export type LeaveStockCommissionDbTableType = {
  uuid: string;
  id: number | null;
  leaveStockId: number;
  name: string;
  price: number;
  quantity: number;

  createdAt: Date | null;
  updatedAt: Date | null;
};
