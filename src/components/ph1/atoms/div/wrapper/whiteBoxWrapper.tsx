"use client";

import classes from "@/styles/components/atoms/div/wrapper/whiteBoxWrapper.module.scss";
import { WhiteBoxWrapperType } from "@/types/components/atoms/div/wrapper/WhiteBoxWrapperType";
import { ReactNode } from "react";

const whiteBoxWrapper = ({ children }: WhiteBoxWrapperType): ReactNode => {
  return <div className={classes.whiteBox__wrapper}>{children}</div>;
};

export default whiteBoxWrapper;
