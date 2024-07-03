"use client";

import { ResetButtonType } from "@/types/components/atoms/button/ResetButtonType";
import classes from "@/styles/components/atoms/button/resetButton.module.scss";
import { ReactElement } from "react";
import Img from "@/components/atoms/img";
import icon from "@/resource/img/cross.svg";

const ResetButton = ({ clickFunction, text }: ResetButtonType): ReactElement => {
  const classNames: string[] = [ classes.button ];
  return (
    <button className={classNames.join(" ")} onClick={clickFunction}>
      <Img src={icon} alt="icon" className={classes.button__icon} />
      {text}
    </button>
  );
};

export default ResetButton;
