import { MouseEvent } from "react";

export type ButtonGroupType = {
  handleDepositButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleWithdrawalButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
};
