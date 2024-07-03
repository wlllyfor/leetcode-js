"use client";

import { SummaryType } from "@/types/components/atoms/SummaryType";
import classes from "@/styles/components/atoms/summary.module.scss";
import { ReactElement } from "react";

const Summary = ({ children, isMenu }: SummaryType): ReactElement => {
  const classNames: string[] = [ classes.summary, ...(isMenu ? [ classes.menu__summary ] : []) ];
  return <summary className={classNames.join(" ")}>{children}</summary>;
};

export default Summary;
