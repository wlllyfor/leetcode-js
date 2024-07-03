import { ChangeEvent } from "react";

export type FileUploadAndLabelType = {
  id: string;
  buttonText: string;
  labelText?: string;
  isMultiple?: boolean;
  isRequired?: boolean;
  changeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
};
