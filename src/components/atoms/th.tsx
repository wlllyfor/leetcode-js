"use client";

import { ThType } from "@/types/components/atoms/ThType";
import classes from "@/styles/components/atoms/th.module.scss";
import { ReactElement } from "react";

const Th = ({ children, isLarge }: ThType): ReactElement => {
  const classNames: string[] = [ classes.th, ...(isLarge ? [ classes.large ] : []) ];
  return <th className={classNames.join(" ")}>{children}</th>;
};

export default Th;
