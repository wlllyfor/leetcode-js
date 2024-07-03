import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { ReactNode } from "react";
import { FormatOptionLabelMeta } from "react-select";

export type SearchSelectType = {
  labelText?: string;
  isRequired?: boolean;
  options: ReactSelectOption[];
  isMulti: boolean;
  checkboxId: string;
  checkboxLabelText: string;
  checked: boolean;
  changeCheckFunction?: (checked: boolean) => void;
  changeFunction?: (e: ReactSelectOption) => void;
  changeMultiFunction?: (e: ReactSelectOption[]) => void;
  value: ReactSelectOption | ReactSelectOption[] | null;
  formatOptionLabel?: (
    data: ReactSelectOption,
    formatOptionLabelMeta: FormatOptionLabelMeta<ReactSelectOption>,
  ) => ReactNode;
};
