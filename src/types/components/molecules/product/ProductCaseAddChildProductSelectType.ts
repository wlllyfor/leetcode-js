import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";

export type ProductCaseAddChildProductSelectType = {
  options: ReactSelectOption[];
  changeFunction?: (e: ReactSelectOption) => void;
  changeMultiItemFunction?: (e: ReactSelectOption[]) => void;
  value?: ReactSelectOption | null;
};
