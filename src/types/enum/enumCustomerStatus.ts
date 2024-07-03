type EnumCustomerStatus = {
  using: string;
  adjourn: string;
  withdraw: string;
  error: string;
};

const enumCustomerStatus: EnumCustomerStatus = {
  using: "using",
  adjourn: "adjourn",
  withdraw: "withdraw",
  error: "error",
};

export type { EnumCustomerStatus };
export { enumCustomerStatus };
