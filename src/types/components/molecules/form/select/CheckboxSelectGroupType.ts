import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

export type CheckboxSelectGroupType = {
  isRequired: boolean;
  text: string;
  id: string;
  checkboxLabelText: string;
  checked: boolean;
  options: ReactSelectOption[];
  isMulti: boolean;
};
