import { ComponentPropsWithRef } from "react";
import { AddressType } from "@/types/components/common/AddressType";

export type InputAddressGroupType = {
  text: string;
  changeAddressFunction: (address: AddressType) => void;
  changeDomesticFunction: (isDomestic: boolean) => void;
  initialAddress?: {
    postal_code: string;
    prefecture_name: string;
    city_name: string;
    town_name: string;
    building_name: string;
  };
  format?: "domestic" | "international";
} & ComponentPropsWithRef<"input">;
