import { ReactNode } from "react";

export type ListType = {
  isMenu?: boolean | null;
  isMenuChild?: boolean | null;
  children: ReactNode;
};
