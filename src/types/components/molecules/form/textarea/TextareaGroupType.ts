import { ChangeEventHandler, FocusEvent, MouseEvent } from "react";

export type TextareaGroupType = {
  onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onClick?: (e: MouseEvent<HTMLTextAreaElement>) => void;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  id: string;
  name?: string;
  placeholder?: string;
  labelText: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  rows: number;
  height?: number;
  value?: string;
};
