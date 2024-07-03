import { ReactSelectInspectOption } from "@/types/reactSelectOptions/ReactSelectInspectOption";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { ReactNode } from "react";
import { FormatOptionLabelMeta } from "react-select";

export type SelectType = {
  id?: string;
  options: ReactSelectOption[];
  isList?: boolean;
  isMulti: boolean;
  placeholder?: string;
  isDisabled?: boolean;
  changeFunction?: (e: ReactSelectOption) => void;
  changeMultiItemFunction?: (e: ReactSelectOption[]) => void;
  changeInspectItemFunction?: (e: ReactSelectInspectOption) => void;
  value?: ReactSelectOption | ReactSelectOption[] | null;
  defaultValue?: ReactSelectOption | ReactSelectOption[] | null;
  formatOptionLabel?: (
    data: ReactSelectOption,
    formatOptionLabelMeta: FormatOptionLabelMeta<ReactSelectOption>,
  ) => ReactNode;
};
