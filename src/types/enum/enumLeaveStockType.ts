type EnumLeaveStockType = {
  waitLeave: string;
  waitReceive: string;
  leaving: string;
  leaved: string;
  hold: string;
  cancelling: string;
  cancelled: string;
};

const enumLeaveStockType: EnumLeaveStockType = {
  waitLeave: "waitLeave",
  waitReceive: "waitReceive",
  leaving: "receiving",
  leaved: "received",
  hold: "hold",
  cancelling: "cancelling",
  cancelled: "cancelled",
};

export type { EnumLeaveStockType };
export { enumLeaveStockType };
