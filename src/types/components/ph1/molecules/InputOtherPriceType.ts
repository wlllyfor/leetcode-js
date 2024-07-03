import { ChangeEvent } from "react";
import { OtherPriceType } from "@/hooks/employee/orderDetail/useUpdate";

export type InputOtherPriceType = {
  otherPrice: OtherPriceType;
  handleOnChangeOtherPricesName: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handleOnChangeOtherPricesPrice: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  isTop: boolean;
  otherPriceTotal: number;
};
