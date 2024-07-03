"use client";

import { CountButtonType } from "@/types/components/atoms/button/CountButtonType";
import classes from "@/styles/components/atoms/button/countButton.module.scss";
import { ReactElement } from "react";

const CountButton = ({ clickFunction, isPlus, isMinus }: CountButtonType): ReactElement => {
  const classNames: string[] = [ classes.button ];
  return (
    <button className={classNames.join(" ")} onClick={clickFunction}>
      {isPlus && <div className={classes.plus}>+</div>}
      {isMinus && <div className={classes.minus}>-</div>}
    </button>
  );
};

export default CountButton;
