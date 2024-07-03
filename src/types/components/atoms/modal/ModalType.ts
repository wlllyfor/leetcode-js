import { MouseEvent, ReactNode } from "react";

export type ModalType = {
  children: ReactNode;
  isOpen: boolean;
  onRequestClose: (event: MouseEvent<HTMLButtonElement>) => void;
};
