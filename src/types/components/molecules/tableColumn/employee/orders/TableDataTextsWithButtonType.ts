import { MouseEvent } from "react";

export type TableDataTextsWithButtonType = {
  texts: Array<string>;
  buttonText: string;
  width?: string;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
};
