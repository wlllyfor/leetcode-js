"use client";

import classes from "@/styles/components/atoms/label.module.scss";
import { LabelType } from "@/types/components/atoms/LabelType";
import { ReactElement } from "react";

const Label = ({
  text,
  htmlFor,
  isRequired,
  isHalf,
  isSmall,
  isLarge,
  isButton,
  className,
  children,
}: LabelType): ReactElement => {
  const classNames: string[] = [
    classes.label,
    ...(className ? [ classes.className ] : []),
    ...(isHalf ? [ classes.half ] : []),
    ...(isSmall ? [ classes.small ] : []),
    ...(isLarge ? [ classes.large ] : []),
    ...(isButton ? [ classes.button ] : []),
  ];
  return (
    <>
      <label className={classNames.join(" ")} htmlFor={htmlFor}>
        {text}
        {children}
        {isRequired && <span className={`${classes.required}`}>*</span>}
      </label>
    </>
  );
};

export default Label;
