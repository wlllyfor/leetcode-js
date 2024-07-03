import { MouseEvent } from "react";

export type ModalClickableButtonType = {
  text: string;
  color: string;
  isAddIcon?: boolean;
  isDisable?: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};
