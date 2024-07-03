import { ComponentPropsWithRef } from "react";

export type NormalClickableButtonType = {
  text: string;
  color: string;
  pxSize?: string;
  fontSize?: string;
} & ComponentPropsWithRef<"button">;
