import { ChangeEventHandler, FocusEvent, MouseEvent } from "react";

export type TableDataFileUploadIconType = {
  onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onClick?: (e: MouseEvent<HTMLTextAreaElement>) => void;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  textareaId: string;
  inputFileUploadIconId: string;
  labelText: string;
  name?: string;
  placeholder?: string;
  isRequired?: boolean;
  rows: number;
  height?: number;
  width?: string;
  value: string;
};
