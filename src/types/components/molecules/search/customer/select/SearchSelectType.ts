import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { ReactNode } from "react";
import { FormatOptionLabelMeta } from "react-select";

export type SearchSelectType = {
  labelText?: string;
  isRequired?: boolean;
  options: ReactSelectOption[];
  isMulti: boolean;
  placeholder?: string;
  changeFunction?: (e: ReactSelectOption) => void;
  changeMultiFunction?: (e: ReactSelectOption[]) => void;
  value: ReactSelectOption | ReactSelectOption[] | null;
  formatOptionLabel?: (
    data: ReactSelectOption,
    formatOptionLabelMeta: FormatOptionLabelMeta<ReactSelectOption>,
  ) => ReactNode;
};
