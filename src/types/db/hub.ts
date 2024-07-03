import { GroupDbTableType } from "@/types/db/group";
import { CountryDbTableType } from "@/types/db/country";
import { CurrencyDbTableType } from "@/types/db/currency";
import { TaxDbTableType } from "@/types/db/tax";
import { PlanDbType } from "@/types/db/plan";

export type HubDbTableType = {
  id: number;
  name: string;
  iconPath: string | null;
  code: string;
  countryId: number;
  currencyId: number;
  forContact: boolean;
  isDomestic: number;
  companyName: string | null;
  postalCode: string | null;
  prefectureName: string | null;
  cityName: string | null;
  townName: string | null;
  buildingName: string | null;
  invoiceNo: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  // relation
  groups: GroupDbTableType[];
  country: CountryDbTableType;
  currency: CurrencyDbTableType;

  // other
  currentTaxRate: TaxDbTableType | null;
  currentCustomerPlan: PlanDbType | null;
  createdOn: string;
  updatedOn: string;
};
