import { ChangeEvent } from "react";

export type InputType = {
  id?: string;
  value?: string | ReadonlyArray<string> | number;
  inputType?: string;
  changeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
  forSearch?: boolean;
  width15Per?: boolean;
  width50Per?: boolean;
  isReadOnly?: boolean;
  placeholder?: string;
  name?: string;
};
