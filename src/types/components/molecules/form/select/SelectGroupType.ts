import { ReactSelectInspectOption } from "@/types/reactSelectOptions/ReactSelectInspectOption";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { ReactNode } from "react";
import { FormatOptionLabelMeta } from "react-select";

export type SelectGroupType = {
  id?: string;
  text?: string;
  options: ReactSelectOption[];
  isRequired?: boolean;
  isMulti?: boolean;
  isList?: boolean;
  isSearch?: boolean;
  isDisabled?: boolean;
  changeFunction?: (e: ReactSelectOption) => void;
  changeMultiItemFunction?: (e: ReactSelectOption[]) => void;
  changeInspectItemFunction?: (e: ReactSelectInspectOption) => void;
  value?: ReactSelectOption | null;
  formatOptionLabel?: (
    data: ReactSelectOption,
    formatOptionLabelMeta: FormatOptionLabelMeta<ReactSelectOption>,
  ) => ReactNode;
};
