import { ComponentPropsWithRef } from "react";

export type InputCheckboxType = {
  id: string;
  checked: boolean;
  text: string;
  fontSize?: string;
  isReverse?: boolean;
  changeFunction?: (e: boolean) => void;
} & ComponentPropsWithRef<"input">;
