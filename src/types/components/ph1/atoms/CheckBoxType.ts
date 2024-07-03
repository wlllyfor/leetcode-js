import { ChangeEvent } from "react";

export type CheckBoxType = {
  changeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string | ReadonlyArray<string> | number | undefined;
  isChecked: boolean;
  id?: string;
};
