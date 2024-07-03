import { ChangeEvent } from "react";

export type FileUploadButtonType = {
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};
