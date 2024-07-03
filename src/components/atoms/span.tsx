"use client";

import { SpanType } from "@/types/components/atoms/SpanType";
import classes from "@/styles/components/atoms/span.module.scss";
import { ReactElement } from "react";

const Span = ({ children, isBold, isUnderLine, isSmall, isBetween }: SpanType): ReactElement => {
  const classNames: string[] = [
    classes.span,
    ...(isBold ? [ classes.bold ] : []),
    ...(isUnderLine ? [ classes.underLine ] : []),
    ...(isSmall ? [ classes.small ] : []),
    ...(isBetween ? [ classes.between ] : []),
  ];
  return <span className={classNames.join(" ")}>{children}</span>;
};

export default Span;
