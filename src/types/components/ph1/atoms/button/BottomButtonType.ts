import { ReactNode } from "react";

export type BottomButtonType = {
  clickFunction?: () => void;
  text?: string | ReadonlyArray<string> | number | undefined;
  children?: ReactNode;
  color?: "green" | "white" | "dark" | "red" | "blue" | "lightBlue" | "yellow" | null;
};
