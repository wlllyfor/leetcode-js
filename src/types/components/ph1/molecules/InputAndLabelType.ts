import { ChangeEvent } from "react";

export type InputAndLabelType = {
  id: string;
  text: string;
  inputType?: "text" | "date" | "password" | "number" | "checkbox" | "radio";
  value: string;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isSmall?: boolean;
  isLarge?: boolean;
  isHalf?: boolean;
  notTop?: boolean;
  showLabel?: boolean;
  title?: string;
  placeholder?: string;
  changeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
};
