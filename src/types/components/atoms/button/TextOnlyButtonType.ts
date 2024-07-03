import { MouseEvent } from "react";

export type TextOnlyButtonType = {
  text: string;
  /** テキストに下線を引くか */
  hasUnderLine?: boolean;
  clickFunction: (event: MouseEvent<HTMLButtonElement>) => void;
};
