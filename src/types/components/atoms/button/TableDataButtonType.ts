import { MouseEvent } from "react";

export type TableDataButtonType = {
  color: string;
  text: string;
  isAddIcon?: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};
