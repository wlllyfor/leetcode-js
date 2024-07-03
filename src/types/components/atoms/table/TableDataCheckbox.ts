import { ComponentPropsWithRef } from "react";

export type TableDataCheckboxType = {
  id: string;
  changeFunction?: (e: boolean) => void;
  width: string;
  minWidth?: string;
} & ComponentPropsWithRef<"input">;
