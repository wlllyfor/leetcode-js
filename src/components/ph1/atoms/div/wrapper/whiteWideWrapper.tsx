"use client";

import classes from "@/styles/components/atoms/div/wrapper/whiteWideWrapper.module.scss";
import { WhiteWideWrapperType } from "@/types/components/atoms/div/wrapper/WhiteWideWrapperType";
import { ReactNode } from "react";

const whiteWideWrapper = ({ children, isRed, isYellow, isDetail }: WhiteWideWrapperType): ReactNode => {
  const classNames: string[] = [
    classes.whiteWide__wrapper,
    ...(isRed ? [ classes.red ] : []),
    ...(isYellow ? [ classes.yellow ] : []),
    ...(isDetail ? [ classes.detail ] : []),
  ];
  return <div className={classNames.join(" ")}>{children}</div>;
};

export default whiteWideWrapper;
