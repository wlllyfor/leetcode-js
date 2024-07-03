type EnumProductLabelType = {
  asin: string;
  sku: string;
  janCode: string;
  fnsku: string;
};

const enumProductLabel: EnumProductLabelType = {
  asin: "asin",
  sku: "sku",
  janCode: "jan_code",
  fnsku: "fnsku",
};

export type { EnumProductLabelType };
export { enumProductLabel };
