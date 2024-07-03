"use client";

import classes from "@/styles/components/atoms/div/wrapper/contentWrapper.module.scss";
import { ContentWrapperType } from "@/types/components/ph1/atoms/div/wrapper/ContentWrapperType";
import { ReactNode } from "react";

const ContentWrapper = ({ children }: ContentWrapperType): ReactNode => {
  return <div className={classes.content__wrapper}>{children}</div>;
};

export default ContentWrapper;
