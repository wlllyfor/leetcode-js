"use client";

import classes from "@/styles/components/atoms/div/wrapper/bottomAreaWrapper.module.scss";
import { BottomAreaWrapperType } from "@/types/components/ph1/atoms/div/wrapper/BottomAreaWrapperType";
import { ReactNode } from "react";

const BottomAreaWrapper = ({ children }: BottomAreaWrapperType): ReactNode => {
  return <div className={classes.bottomArea__wrapper}>{children}</div>;
};

export default BottomAreaWrapper;
