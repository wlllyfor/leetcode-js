type EnumOrderStatus = {
  unProcessed: string;
  inCart: string;
  outOfStock: string;
  waitForPay: string;
  paid: string;
  canceling: string;
  canceled: string;
};

const enumOrderStatus: EnumOrderStatus = {
  unProcessed: "un_processed",
  inCart: "in_cart",
  outOfStock: "out_of_stock",
  waitForPay: "wait_for_pay",
  paid: "paid",
  canceling: "canceling",
  canceled: "canceled",
};

export type { EnumOrderStatus };
export { enumOrderStatus };
