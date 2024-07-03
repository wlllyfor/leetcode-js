"use client";

import classes from "@/styles/components/atoms/div/wrapper/headerWrapper.module.scss";
import { ReactElement, ReactNode } from "react";

const HeaderWrapper = ({ children }: { children: ReactNode; }): ReactElement => {
  return <div className={classes.header__wrapper}>{children}</div>;
};

export default HeaderWrapper;
