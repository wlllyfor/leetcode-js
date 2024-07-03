import { MouseEvent } from "react";

export type TableDataDeleteIconType = {
  id: string;
  width?: string;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
};
