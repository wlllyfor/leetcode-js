type EnumProductType = {
  normal: string;
  amazon: string;
  case: string;
  companyEquipment: string;
};

const enumProduct: EnumProductType = {
  normal: "normal",
  amazon: "amazon",
  case: "case",
  companyEquipment: "company_equipment",
};

export type { EnumProductType };
export { enumProduct };
