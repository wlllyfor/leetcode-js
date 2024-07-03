import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { ReactSelectInspectOption } from "@/types/reactSelectOptions/ReactSelectInspectOption";

export type SelectAndLabelType = {
  id: string;
  text: string;
  options: ReactSelectOption[];
  isRequired?: boolean;
  isSmall?: boolean;
  isLarge?: boolean;
  isList?: boolean;
  isSearch?: boolean;
  isMulti?: boolean;
  isDisabled?: boolean;
  isTopItem?: boolean;
  showLabel?: boolean;
  changeFunction?: (e: ReactSelectOption) => void;
  changeMultiItemFunction?: (e: ReactSelectOption[]) => void;
  changeInspectItemFunction?: (e: ReactSelectInspectOption) => void;
  value?: ReactSelectOption | null;
};
