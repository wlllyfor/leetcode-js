import { ReactNode } from "react";

export type LabelType = {
  text: string | ReadonlyArray<string> | number | undefined;
  htmlFor?: string | undefined;
  isRequired?: boolean;
  isHalf?: boolean;
  isSmall?: boolean;
  isLarge?: boolean;
  isButton?: boolean;
  className?: string;
  children?: ReactNode;
};
