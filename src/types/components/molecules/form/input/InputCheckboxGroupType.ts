import { ComponentProps } from "react";

export type InputCheckboxGroupType = ComponentProps<"input"> & {
  text?: string;
  id: string;
  name?: string;
  value?: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  maxLength?: number;
  isAutocomplete?: boolean;
  isReadOnly?: boolean;
  initialValue?: string;
  checkboxId: string;
  checkboxLabelText: string;
  checked: boolean;
  changeFunction?: (e: boolean) => void;
};
