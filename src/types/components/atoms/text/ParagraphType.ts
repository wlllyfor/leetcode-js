import { ComponentProps, ReactNode } from "react";

export type ParagraphType = ComponentProps<"p"> & {
  text?: string;
  children?: ReactNode;
  fontSize?: string;
  color?: string;
  isBold?: boolean;
};
