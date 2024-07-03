import { ReactNode } from "react";

export type BadgeType = {
  children: ReactNode;
  color?: "green" | "white" | "dark" | "red" | "blue" | null;
};
