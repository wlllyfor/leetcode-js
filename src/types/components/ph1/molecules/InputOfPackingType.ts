import { ChangeEvent } from "react";

export type InputOfPackingType = {
  weightValue: string;
  heightValue: string;
  widthValue: string;
  depthValue: string;
  boxesQuantityValue: string;
  postageValue: string;
  showLabel: boolean;
  weightChangeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
  heightChangeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
  widthChangeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
  depthChangeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
  boxesQuantityChangeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
  postageChangeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
};
