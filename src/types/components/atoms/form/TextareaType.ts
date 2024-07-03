import { ChangeEventHandler, ComponentProps, FocusEvent, MouseEvent } from "react";

export type TextareaType = ComponentProps<"textarea"> & {
  onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onClick?: (e: MouseEvent<HTMLTextAreaElement>) => void;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  id: string;
  name?: string;
  placeholder?: string;
  isRequired: boolean;
  isDisabled: boolean;
  isReadOnly: boolean;
  rows: number;
  height?: number;
};
