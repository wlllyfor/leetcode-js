import { useState } from "react";
import { AddressType } from "@/types/components/common/AddressType";

const useAddress = () => {
  const [ address, setAddress ] = useState<AddressType>({
    postal_code: "",
    prefecture_name: "",
    city_name: "",
    town_name: "",
    building_name: "",
  });

  return { address, setAddress };
};

export { useAddress };
