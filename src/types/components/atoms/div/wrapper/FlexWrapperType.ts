import { ReactNode } from "react";

export type FlexWrapperType = {
  children: ReactNode;
  isReverse?: boolean;
  /** ref: https://tailwindcss.com/docs/align-items */
  alignItem?: "items-start" | "items-end" | "items-center" | "items-baseline" | "items-stretch";
};
