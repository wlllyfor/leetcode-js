"use client";

import classes from "@/styles/components/atoms/h3.module.scss";
import { H3Type } from "@/types/components/atoms/H3Type";
import { ReactNode } from "react";

const H3 = ({ children }: H3Type): ReactNode => {
  return <h3 className={classes.h3}>{children}</h3>;
};

export default H3;
