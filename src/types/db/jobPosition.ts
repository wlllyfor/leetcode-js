import { CountryDbTableType } from "./country";
import { CurrencyDbTableType } from "./currency";
import { TaxDbTableType } from "./tax";

export type JobPositionDbTableType = {
  id: number;
  hubId: number;
  name: string;
  hub: {
    id: number;
    name: string;
    code: string;
    countryId: number;
    currencyId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    country: CountryDbTableType;
    currency: CurrencyDbTableType;
    currentTaxRate: TaxDbTableType;
  };
};
