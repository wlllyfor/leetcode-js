import { ChangeEventHandler, FocusEvent, MouseEvent } from "react";

export type FileUploadIconInputGroupType = {
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  inputId: string;
  inputFileUploadIconId: string;
  inputValue: string;
  text: string;
  name: string;
  isRequired: boolean;
};
