import { ComponentPropsWithRef } from "react";

export type FormButtonType = {
  text: string | ReadonlyArray<string> | number | undefined;
  icon?: string | null;
  color: "green" | "white" | "dark" | "red" | "lightblue" | "gray";
} & ComponentPropsWithRef<"button">;
