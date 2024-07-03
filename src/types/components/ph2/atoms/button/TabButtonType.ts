import { ReactNode } from "react";

export type TabButtonType = {
  clickFunction?: () => void | null;
  isActive?: boolean | null;
  children: ReactNode;
  color?: string;
};
