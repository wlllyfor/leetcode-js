import { ComponentPropsWithRef } from "react";

export type FormButtonType = {
  clickFunction?: () => void;
  text: string | ReadonlyArray<string> | number | undefined;
  icon?: string | null;
  color: "green" | "white" | "dark" | "red";
  isDisabled?: boolean;
} & ComponentPropsWithRef<"button">;
