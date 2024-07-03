import type { HubDbTableType } from "@/types/db/hub";

export type TableRowItemType = Pick<
  HubDbTableType,
  | "id"
  | "name"
  | "iconPath"
  | "code"
  | "countryId"
  | "currencyId"
  | "forContact"
  | "isDomestic"
  | "companyName"
  | "postalCode"
  | "prefectureName"
  | "cityName"
  | "townName"
  | "buildingName"
  | "invoiceNo"
  | "description"
  | "createdAt"
  | "updatedAt"
  | "createdOn"
  | "updatedOn"
  | "deletedAt"
  | "groups"
  | "country"
  | "currency"
  | "currentTaxRate"
>;