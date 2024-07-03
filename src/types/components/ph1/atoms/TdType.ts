import { ReactNode } from "react";

export type TdType = {
  children: ReactNode;
  isLeft?: boolean;
  isRight?: boolean;
  isCenter?: boolean;
  isLarge?: boolean;
};
