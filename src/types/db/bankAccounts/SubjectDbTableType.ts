import { CountryDbType } from "@/types/db/country";
import { CurrencyDbType } from "@/types/db/currency";
import { PlanDbType } from "@/types/db/plan";
import { TaxDbTableType } from "@/types/db/tax";

export type SubjectDbTableType = {
  id: number;
  hub_id: number;
  name: string;
  is_profit: number;
  rate: number;
  createdOn: string;
  updatedOn: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  hub: {
    id: number;
    name: string;
    code: string;
    countryId: number;
    currencyId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    country: CountryDbType;
    currency: CurrencyDbType;
    currentTaxRate: TaxDbTableType;
  };
  plans: PlanDbType[];
};
