import { ChangeEvent, FocusEvent, MouseEvent } from "react";

export type FileTextareaGroupType = {
  onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onClick?: (e: MouseEvent<HTMLTextAreaElement>) => void;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  textareaId: string;
  inputFileUploadIconId: string;
  labelText: string;
  name?: string;
  placeholder?: string;
  isRequired?: boolean;
  rows: number;
  height?: number;
  value: string;
  handleFileOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};
