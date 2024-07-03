import { ChangeEvent } from "react";

export type FileUploadButtonType = {
  id?: string;
  text?: string;
  name?: string;
  isMultiple?: boolean;
  changeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
};
