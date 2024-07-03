import { ChangeEvent } from "react";

export type FileUploadType = {
  id?: string;
  name?: string;
  isMultiple?: boolean;
  className?: string;
  changeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
};
