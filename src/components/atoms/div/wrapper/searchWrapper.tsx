"use client";

import { ReactElement } from "react";
import { SearchWrapperType } from "@/types/components/atoms/div/wrapper/SearchWrapperType";

const SearchWrapper = ({ children }: SearchWrapperType): ReactElement => {
  return <div className="mt-16 mb-4 p-4 w-fit min-w-[1000px] bg-white rounded-md">{children}</div>;
};

export default SearchWrapper;
