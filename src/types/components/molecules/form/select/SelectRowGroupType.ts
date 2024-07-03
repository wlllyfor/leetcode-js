import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

export type SelectRowGroupType = {
  text?: string;
  options: ReactSelectOption[][];
  isRequired?: boolean;
  isMulti?: boolean;
};
