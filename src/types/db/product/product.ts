import { HubDbTableType } from "@/types/db/hub";
import { CaseProductTypeDbTableType } from "@/types/db/product/caseProductTypeDbTableType";
import { CustomerDbTableType } from "@/types/db/customer";
import { CaseProductDbTableType } from "@/types/db/product/caseProduct";
import { ProductStockType } from "@/types/db/product/productStock";

export type ProductDbTableType = {
  uuid: string;
  id: number | null;
  customerId: number | null;
  hubId: number | null;
  name: string | null;
  nameToSlip: string | null;
  productType: string | null; // EnumProductType
  sku: string | null;
  fnsku: string | null;
  janCode: string | null;
  asin: string | null;
  productLabelType: string | null; // EnumProductLabelType
  productUrl: string | null;
  productApiUrl: string | null;
  productImageUrl: string | null;
  weight: number;
  height: number;
  width: number;
  depth: number;
  unitPrice: number;
  isDisabled: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;

  // 入荷検品用
  receiveStockDetailId: number | null;

  // not model
  stockQuantity: number;
  code: string;
  label: string;
  productTypeLabel: string;
  createdOn: string | null;
  updatedOn: string | null;

  // relation
  hub: HubDbTableType | null;
  caseProductType: CaseProductTypeDbTableType | null;
  caseChildrenProducts: CaseProductDbTableType[] | null;
  customer: CustomerDbTableType | null;
  productStocks: ProductStockType[];
};
