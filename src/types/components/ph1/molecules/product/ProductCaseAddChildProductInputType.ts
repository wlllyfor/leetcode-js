import { ChangeEvent } from "react";

export type ProductCaseAddChildProductInputType = {
  id: string;
  inputType?: string;
  value: string;
  changeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
  clickFunction?: () => void | null;
  inputFunction?: () => void | null;
};
