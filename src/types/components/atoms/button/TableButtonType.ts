import { MouseEvent } from "react";

export type TableButtonType = {
  text: string;
  color: string;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
};
