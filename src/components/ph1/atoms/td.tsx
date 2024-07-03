"use client";

import { TdType } from "@/types/components/atoms/TdType";
import classes from "@/styles/components/atoms/td.module.scss";
import { ReactElement } from "react";

const Td = ({ children, isLeft, isRight, isCenter, isLarge }: TdType): ReactElement => {
  const classNames: string[] = [
    classes.td,
    ...(isLeft ? [ classes.left ] : []),
    ...(isRight ? [ classes.right ] : []),
    ...(isCenter ? [ classes.center ] : []),
    ...(isLarge ? [ classes.large ] : []),
  ];
  return <td className={classNames.join(" ")}>{children}</td>;
};

export default Td;
