import { ChangeEventHandler, FocusEvent, MouseEvent } from "react";

export type FileUploadInputType = {
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  id: string;
  // value: string | number;
  name?: string;
  isRequired: boolean;
  // ref: RefObject<HTMLInputElement>;
};
