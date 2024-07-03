import { ComponentProps } from "react";

export type InputType = ComponentProps<"input"> & {
  id: string;
  name?: string;
  inputType?: string;
  placeholder?: string;
  isRequired: boolean;
  isDisabled: boolean;
  maxLength?: number;
  isAutocomplete: boolean;
  isReadOnly?: boolean;
};
