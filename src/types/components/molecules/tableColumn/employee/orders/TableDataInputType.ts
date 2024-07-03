import { ComponentProps } from "react";

export type TableDataInputType = ComponentProps<"input"> & {
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
  width?: string;
};
