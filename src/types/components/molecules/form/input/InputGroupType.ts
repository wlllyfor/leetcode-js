import { ComponentProps } from "react";

export type InputGroupType = ComponentProps<"input"> & {
  text?: string;
  id: string;
  name?: string;
  value: string;
  inputType?: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  maxLength?: number;
  isAutocomplete?: boolean;
  isReadOnly?: boolean;
};
