type EnumReceiveStockType = {
  wait: string;
  receiving: string;
  received: string;
};

const enumReceiveStockType: EnumReceiveStockType = {
  wait: "wait",
  receiving: "receiving",
  received: "received",
};

export type { EnumReceiveStockType };
export { enumReceiveStockType };
