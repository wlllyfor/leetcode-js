import { MouseEvent } from "react";

export type TableDataInspectItemType = {
  text?: string;
  width?: string;
  clickFunction: (e: MouseEvent<HTMLButtonElement>) => void;
  isDisable?: boolean;
};
