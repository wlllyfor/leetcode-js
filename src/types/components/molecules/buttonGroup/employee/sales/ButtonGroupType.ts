import { MouseEvent } from "react";

export type ButtonGroupType = {
  handleModalButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleCalcButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
};
