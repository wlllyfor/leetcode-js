"use client";

import classes from "@/styles/components/atoms/div/wrapper/bottomAreaWrapper.module.scss";
import { ReactNode } from "react";

const BottomAreaWrapper = ({ children }: { children: ReactNode; }): ReactNode => {
  return <div className={classes.bottomArea__wrapper}>{children}</div>;
};

export default BottomAreaWrapper;
