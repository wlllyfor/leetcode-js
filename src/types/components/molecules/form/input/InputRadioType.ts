import { ChangeEvent } from "react";

export type InputRadioType = {
  name: string;
  fontSize?: string;
  options: OptionType[];
  initialValue?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

type OptionType = {
  id: string;
  text: string;
};
