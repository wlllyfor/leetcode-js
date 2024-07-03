import { ChangeEvent } from "react";

export type RadioButtonType = {
  id: string;
  text: string;
  value: string;
  isRequired?: boolean;
  isReadOnly?: boolean;
  title?: string;
  name?: string;
  changeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
  clickFunction?: () => void;
  inputFunction?: () => void;
};
