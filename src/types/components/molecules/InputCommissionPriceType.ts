import { ChangeEvent } from "react";
import { CommissionDetailType } from "@/hooks/employee/receiveStock/request/useUpdate";

export type InputCommissionPriceType = {
  commissionPrice: CommissionDetailType;
  handleOnChangeOtherPricesName: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handleOnChangeOtherPricesPrice: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  isTop: boolean;
  commissionPriceTotal: number;
};
