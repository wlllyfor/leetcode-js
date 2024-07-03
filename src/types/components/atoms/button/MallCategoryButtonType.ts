import { ComponentPropsWithRef } from "react";

export type MallCategoryButtonType = {
  text: string;
} & ComponentPropsWithRef<"button">;
