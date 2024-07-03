"use client";

import { SmallButtonType } from "@/types/components/atoms/button/SmallButtonType";
import classes from "@/styles/components/atoms/button/smallButton.module.scss";
import Img from "@/components/atoms/img";
import { ReactElement } from "react";

const SmallButton = ({
  clickFunction,
  text,
  icon,
  isBlue,
  isGreen,
  isRed,
  isDark,
  isSearch,
  isDisable,
}: SmallButtonType): ReactElement => {
  const classNames: string[] = [
    classes.button,
    ...(isBlue ? [ classes.blue ] : []),
    ...(isGreen ? [ classes.green ] : []),
    ...(isRed ? [ classes.red ] : []),
    ...(isDark ? [ classes.dark ] : []),
    ...(isSearch ? [ classes.search ] : []),
    ...(isDisable ? [ classes.disable ] : []),
  ];
  return (
    <button className={classNames.join(" ")} onClick={clickFunction} disabled={isDisable}>
      {icon && <Img src={icon} alt="icon" className={classes.button__icon} />}
      {text}
    </button>
  );
};

export default SmallButton;
