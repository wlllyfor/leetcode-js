"use client";

import { ReactElement } from "react";
import { SearchWrapperType } from "@/types/components/atoms/div/wrapper/SearchWrapperType";

const SearchInputWrapper = ({ children }: SearchWrapperType): ReactElement => {
  return (
    <div
      className="
        relative p-2 pt-1 rounded-md w-fit h-fit
        border border-gray-200 border-solid
      "
    >
      {children}
    </div>
  );
};

export default SearchInputWrapper;
