import { useState } from "react";
import { AddressType } from "@/types/components/common/AddressType";

export type CustomerAddressType = {
  country_id: number | null;
  tel?: string;
} & AddressType;

const useAddress = () => {
  const [ address, setAddress ] = useState<CustomerAddressType>({
    country_id: null,
    postal_code: "",
    prefecture_name: "",
    city_name: "",
    town_name: "",
    building_name: "",
    tel: "",
  });

  return { address, setAddress };
};

export { useAddress };
