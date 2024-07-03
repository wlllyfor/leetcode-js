import { ChangeEvent, ReactNode } from "react";

export type SearchInputType = {
  id: string;
  text?: string;
  children?: ReactNode;
  value: string;
  placeholder?: string;
  handleValueOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};
