import { ChangeEventHandler, MouseEvent } from "react";

export type RadioInputType = {
  id: string;
  name: string;
  checked: boolean;
  fontSize?: string;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};
