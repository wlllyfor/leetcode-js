import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

export type SearchSelectCheckboxType = {
  labelText: string;
  checkboxText: string;
  checkboxId: string;
  isRequired: boolean;
  options: ReactSelectOption[];
  isMulti: boolean;
};
