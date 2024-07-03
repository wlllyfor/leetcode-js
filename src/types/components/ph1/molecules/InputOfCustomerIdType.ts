import { ChangeEvent } from "react";

export type InputOfCustomerIdType = {
  id: string;
  text: string;
  value: string;
  title: string;
  isRequired?: boolean;
  isMarginLeft?: boolean;
  changeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
  clickFunction?: () => void;
  inputFunction?: () => void;
};
