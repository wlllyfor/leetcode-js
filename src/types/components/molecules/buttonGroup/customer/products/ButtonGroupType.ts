import { MouseEvent } from "react";

export type ButtonGroupType = {
  handleAddNormalProductButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleAddCaseProductButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
};
