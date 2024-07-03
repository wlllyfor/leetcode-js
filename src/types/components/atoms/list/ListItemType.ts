import { ReactNode } from "react";

export type ListItemType = {
  isInDetails?: boolean | null;
  children: ReactNode;
};
