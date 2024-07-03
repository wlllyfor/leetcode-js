import { ReactNode } from "react";

export type LabelType = {
  text?: string;
  children?: ReactNode;
  isRequired?: boolean | undefined;
  fontSize?: string;
  htmlFor?: string;
  subText?: string;
  hover?: boolean;
};
