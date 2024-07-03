import { ChangeEvent } from "react";

export type InputFileUploadIconType = {
  id: string;
  isRequired: boolean;
  value: string;
  name?: string;
  handleOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};
