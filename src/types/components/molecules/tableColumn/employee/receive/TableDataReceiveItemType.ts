import { MouseEvent } from "react";

export type TableDataReceiveItemType = {
  text?: string;
  width?: string;
  clickFunction: (e: MouseEvent<HTMLButtonElement>) => void;
  isDisable?: boolean;
};
