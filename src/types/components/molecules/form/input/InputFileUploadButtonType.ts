import { ChangeEvent } from "react";

export type InputFileUploadButtonType = {
  id: string;
  isRequired?: boolean;
  labelText: string;
  name?: string;
  changeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
};
