import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { ChangeEvent, MouseEvent } from "react";

export type MallHeaderTopType = {
  keyword: string;
  /** ハードコーディング用 */
  category?: string;
  language?: string;
  isFilterVisible: boolean;
  handleSearchGroupButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onKeywordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange?: (option: ReactSelectOption) => void;
  onLanguageChange?: (option: ReactSelectOption) => void;
  searchFunction?: (page?: number) => void;
};
