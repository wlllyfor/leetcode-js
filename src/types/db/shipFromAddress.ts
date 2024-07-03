import { HubDbTableType } from "@/types/db/hub";
import { CustomerDbTableType } from "@/types/db/customer";
import { CountryDbTableType } from "@/types/db/country";

export type ShipFromAddressDbTableType = {
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
  is_default: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;

  // relation
  hub: HubDbTableType | null;
  customer: CustomerDbTableType | null;
  country: CountryDbTableType | null;
};

export const emptyShipFromAddress: ShipFromAddressDbTableType = {
  id: null,
  customerId: null,
  countryId: null,
  postalCode: null,
  prefectureName: null,
  cityName: null,
  townName: null,
  buildingName: null,
  name: null,
  tel: null,
  is_default: false,
  createdAt: null,
  updatedAt: null,

  // relation
  hub: null,
  customer: null,
  country: null,
};
