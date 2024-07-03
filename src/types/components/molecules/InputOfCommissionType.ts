import { ChangeEvent } from "react";

export type InputOfCommissionType = {
  name: string;
  price: string;
  quantity: string;
  commissionTotal: number;
  nameChangeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
  priceChangeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
  quantityChangeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
  showLabel: boolean;
};
