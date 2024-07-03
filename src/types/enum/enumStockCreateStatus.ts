type EnumStockCreateStatus = {
  notYet: string;
  createdReceiveStock: string;
  createdLeaveStock: string;
};

const enumStockCreateStatus: EnumStockCreateStatus = {
  notYet: "notYet",
  createdReceiveStock: "createdReceiveStock",
  createdLeaveStock: "createdLeaveStock",
};

export type { EnumStockCreateStatus };
export { enumStockCreateStatus };
