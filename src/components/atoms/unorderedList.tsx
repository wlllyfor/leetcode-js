"use client";

import { UnorderedListType } from "@/types/components/atoms/UnorderedListType";
import classes from "@/styles/components/atoms/unorderedList.module.scss";
import { ReactElement } from "react";

const UnorderedList = ({ children }: UnorderedListType): ReactElement => {
  return <ul className={classes.ul}>{children}</ul>;
};

export default UnorderedList;
