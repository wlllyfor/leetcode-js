import { ComponentPropsWithRef } from "react";

export type CheckboxInputType = {
  id: string;
  checked: boolean;
} & ComponentPropsWithRef<"input">;
