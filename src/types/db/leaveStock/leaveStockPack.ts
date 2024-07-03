export type LeaveStockPackDbTableType = {
  uuid: string;
  id: number | null;
  leaveStockId: number;
  /**
   * 別梱包の場合、商品IDがない
   */
  productId: number | null;
  weight: number;
  height: number;
  width: number;
  depth: number;
  /**
   * 梱包箱数
   */
  boxesQuantity: number;
  postage: number;

  createdAt: Date | null;
  updatedAt: Date | null;
};
