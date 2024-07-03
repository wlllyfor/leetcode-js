"use client";

import classes from "@/styles/components/atoms/flex.module.scss";
import { ReactElement, ReactNode } from "react";

const Flex = ({ children }: { children: ReactNode; }): ReactElement => {
  return <div className={classes.flex}>{children}</div>;
};

export default Flex;
