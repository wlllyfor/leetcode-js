"use client";

import classes from "@/styles/components/atoms/paragraph.module.scss";
import commonClasses from "@/styles/common/page.module.scss";
import { ParagraphType } from "@/types/components/atoms/ParagraphType";
import { ReactNode } from "react";

const Paragraph = ({
  isWhite = null,
  isLink = null,
  isLeft = null,
  isCenter = null,
  isRight = null,
  isSmall = null,
  isBold = null,
  isGray = null,
  isLarge = null,
  isMarginTop = null,
  children,
  clickFunction,
}: ParagraphType): ReactNode => {
  const classNames: string[] = [
    classes.paragraph,
    ...(isWhite ? [ classes.white ] : []),
    ...(isLink ? [ classes.link ] : []),
    ...(isLeft ? [ classes.left ] : []),
    ...(isCenter ? [ classes.center ] : []),
    ...(isRight ? [ classes.right ] : []),
    ...(isSmall ? [ classes.small ] : []),
    ...(isBold ? [ classes.bold ] : []),
    ...(isGray ? [ classes.gray ] : []),
    ...(isLarge ? [ classes.large ] : []),
    ...(isMarginTop ? [ commonClasses.mt_8 ] : []),
  ];

  return (
    <p className={classNames.join(" ")} onClick={clickFunction}>
      {children}
    </p>
  );
};

export default Paragraph;
