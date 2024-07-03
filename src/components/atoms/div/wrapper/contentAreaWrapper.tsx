"use client";

import { ReactElement } from "react";
import { ContentAreaWrapperType } from "@/types/components/atoms/div/wrapper/ContentAreaWrapperType";

const ContentAreaWrapper = ({ children }: ContentAreaWrapperType): ReactElement => {
  return <div className="mb-4 w-full">{children}</div>;
};

export default ContentAreaWrapper;
