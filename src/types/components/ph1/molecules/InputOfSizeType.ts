import { ChangeEvent } from "react";

export type InputOfSizeType = {
  id: string;
  text: string;
  heightValue: string;
  widthValue: string;
  depthValue: string;
  isRequired?: boolean;
  isSmall?: boolean;
  isMarginLeft?: boolean;
  showLabel?: boolean;
  heightChangeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
  widthChangeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
  depthChangeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
};
