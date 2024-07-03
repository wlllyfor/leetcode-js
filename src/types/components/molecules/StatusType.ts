import { ReactNode } from "react";

export type StatusType = {
  children: ReactNode;
  color?: "green" | "white" | "dark" | "red" | "blue" | null;
};
