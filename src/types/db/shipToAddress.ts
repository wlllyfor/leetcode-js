import { HubDbTableType } from "@/types/db/hub";
import { CustomerDbTableType } from "@/types/db/customer";
import { CountryDbTableType } from "@/types/db/country";

export type ShipToAddressDbTableType = {
  id: number | null;
  customerId: number | null;
  countryId: number | null;
  postalCode: string | null;
  prefectureName: string | null;
  cityName: string | null;
  townName: string | null;
  buildingName: string | null;
  name: string | null;
  tel: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;

  // relation
  hub: HubDbTableType | null;
  customer: CustomerDbTableType | null;
  country: CountryDbTableType | null;
};
