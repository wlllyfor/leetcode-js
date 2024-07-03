import { ChangeEvent, ChangeEventHandler, FocusEvent, MouseEvent } from "react";

export type FileUploadButtonGroupType = {
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  inputFileUploadButtonId: string;
  buttonText: string;
  name: string;
  labelText: string;
  changeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
};
