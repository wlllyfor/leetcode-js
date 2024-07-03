"use client";

import classes from "@/styles/components/atoms/h2.module.scss";
import { H2Type } from "@/types/components/atoms/H2Type";
import { ReactNode } from "react";

const H2 = ({ children, isPageTop }: H2Type): ReactNode => {
  const classNames: string[] = [ classes.h2, ...(isPageTop ? [ classes.pageTop ] : []) ];
  return <h2 className={classNames.join(" ")}>{children}</h2>;
};

export default H2;
