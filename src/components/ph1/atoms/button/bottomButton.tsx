"use client";

import classes from "@/styles/components/atoms/button/bottomButton.module.scss";
import { BottomButtonType } from "@/types/components/atoms/button/BottomButtonType";
import { ReactElement } from "react";

const BottomButton = ({ clickFunction, text, color, children }: BottomButtonType): ReactElement => {
  const buttonClassNames: string[] = [
    classes.button,
    ...(color === "green" ? [ classes.green ] : []),
    ...(color === "white" ? [ classes.white ] : []),
    ...(color === "dark" ? [ classes.dark ] : []),
    ...(color === "red" ? [ classes.red ] : []),
    ...(color === "blue" ? [ classes.blue ] : []),
    ...(color === "lightBlue" ? [ classes.lightBlue ] : []),
    ...(color === "yellow" ? [ classes.yellow ] : []),
  ];
  return (
    <div className={classes.button_wrapper}>
      <button className={buttonClassNames.join(" ")} onClick={clickFunction}>
        {text}
        {children}
      </button>
    </div>
  );
};

export default BottomButton;
