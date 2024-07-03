import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { ReactSelectInspectOption } from "@/types/reactSelectOptions/ReactSelectInspectOption";

export type SelectType = {
  id: string;
  options: ReactSelectOption[];
  isList?: boolean;
  isSearch?: boolean;
  isMulti?: boolean;
  isDisabled?: boolean;
  changeFunction?: (e: ReactSelectOption) => void;
  changeMultiItemFunction?: (e: ReactSelectOption[]) => void;
  changeInspectItemFunction?: (e: ReactSelectInspectOption) => void;
  value?: ReactSelectOption | null;
};
