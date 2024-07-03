"use client";

import Img from "@/components/atoms/img";
import classes from "@/styles/components/atoms/button/formButton.module.scss";
import { FormButtonType } from "@/types/components/atoms/button/FormButtonType";
import { ReactElement } from "react";

const FormButton = ({ onClick, text, icon, color, disabled }: FormButtonType): ReactElement => {
  const classNames: string[] = [
    classes.button,
    ...(color === "green" ? [ classes.green ] : []),
    ...(color === "white" ? [ classes.white ] : []),
    ...(color === "dark" ? [ classes.dark ] : []),
    ...(color === "red" ? [ classes.red ] : []),
  ];
  return (
    <button className={classNames.join(" ")} onClick={onClick} disabled={disabled}>
      {icon && <Img src={icon} alt="icon" className={classes.button__icon} />}
      {text}
    </button>
  );
};

export default FormButton;
