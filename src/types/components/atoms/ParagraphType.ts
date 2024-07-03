import { ReactNode } from "react";

export type ParagraphType = {
  isWhite?: boolean | null;
  isLink?: boolean | null;
  isLeft?: boolean | null;
  isCenter?: boolean | null;
  isRight?: boolean | null;
  isSmall?: boolean | null;
  isBold?: boolean | null;
  isGray?: boolean | null;
  isLarge?: boolean | null;
  isMarginTop?: boolean | null;
  children: ReactNode;
  clickFunction?: () => void;
};
