"use client";

import { UnorderedListType } from "@/types/components/atoms/list/UnorderedListType";
import { ReactElement } from "react";

const UnorderedList = ({ children }: UnorderedListType): ReactElement => {
  return <ul>{children}</ul>;
};

export default UnorderedList;
