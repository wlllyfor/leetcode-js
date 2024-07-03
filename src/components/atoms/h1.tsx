"use client";

import classes from "@/styles/components/atoms/h1.module.scss";
import { ReactNode } from "react";

const H1 = ({ children }: { children: ReactNode; }): ReactNode => {
  return <h1 className={classes.header}>{children}</h1>;
};

export default H1;
