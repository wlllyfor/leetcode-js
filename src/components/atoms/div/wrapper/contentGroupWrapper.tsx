"use client";

import { ReactElement } from "react";
import { ContentGroupWrapperType } from "@/types/components/atoms/div/wrapper/ContentGroupWrapperType";

const ContentGroupWrapper = ({ children, width = "w-[360px]" }: ContentGroupWrapperType): ReactElement => {
  const className = `
    py-2 px-[20px] bg-[#F9FAFB] ml-[-20px] mb-2 ${width}
  `;
  return <div className={className}>{children}</div>;
};

export default ContentGroupWrapper;
