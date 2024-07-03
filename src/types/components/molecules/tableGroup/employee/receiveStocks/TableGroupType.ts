import { MouseEvent } from "react";

export type TableGroupType = {
  handleModalButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleDeleteColumn: (event: MouseEvent<HTMLButtonElement>) => void;
};
