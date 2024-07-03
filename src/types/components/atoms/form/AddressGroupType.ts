import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

type CustomerAddressType = {
  country_id: number | null;
  postal_code: string;
  prefecture_name: string;
  city_name: string;
  town_name: string;
  building_name: string;
  tel?: string;
};

export type AddressGroupType = {
  title: string;
  isRequired?: boolean;
  options: ReactSelectOption[];
  initialAddress?: CustomerAddressType;
  changeAddressFunction: (address: CustomerAddressType) => void;
};
