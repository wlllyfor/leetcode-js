import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { ReactSelectInspectOption } from "@/types/reactSelectOptions/ReactSelectInspectOption";
import { ReactNode } from "react";
import { FormatOptionLabelMeta } from "react-select";

export type InspectProductSelectGroupType = {
  labelText?: string;
  isRequired?: boolean;
  options: ReactSelectInspectOption[];
  isMulti: boolean;
  changeFunction?: (e: ReactSelectInspectOption) => void;
  changeMultiFunction?: (e: ReactSelectOption[]) => void;
  value: ReactSelectOption | ReactSelectOption[] | null;
  formatOptionLabel?: (
    data: ReactSelectOption,
    formatOptionLabelMeta: FormatOptionLabelMeta<ReactSelectOption>,
  ) => ReactNode;
};
