import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

export type SortType = {
  id: string;
  options: ReactSelectOption[];
  isMulti?: boolean;
  changeFunction?: (e: ReactSelectOption) => void;
  changeMultiItemFunction?: (e: ReactSelectOption[]) => void;
  value?: ReactSelectOption | null;
  placeholder?: string;
};
