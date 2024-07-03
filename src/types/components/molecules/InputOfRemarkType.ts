import { ChangeEvent } from "react";

export type InputOfRemarkType = {
  id: string;
  text: string;
  value: string;
  file?: File | null;
  isRequired?: boolean;
  isSmall?: boolean;
  isMarginLeft?: boolean;
  isCustomerOrder?: boolean;
  changeTextFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
  changeFileFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
};
