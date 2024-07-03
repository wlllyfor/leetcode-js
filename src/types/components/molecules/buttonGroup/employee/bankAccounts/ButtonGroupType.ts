import { MouseEvent } from "react";

export type ButtonGroupType = {
  handlePaymentsButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleAccountItemButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleProfitButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleSuppliersButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
};
