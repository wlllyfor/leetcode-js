import { ReactNode } from "react";

export type SpanType = {
  isBold?: boolean | null;
  isUnderLine?: boolean | null;
  isSmall?: boolean | null;
  isBetween?: boolean | null;
  children: ReactNode;
};
