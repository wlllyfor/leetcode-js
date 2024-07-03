import { MouseEvent } from "react";

export type ButtonGroupType = {
  handleInspectionButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleReceiveButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
};
