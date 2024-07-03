"use client";

import { CloseButtonType } from "@/types/components/atoms/button/CloseButtonType";
import classes from "@/styles/components/atoms/button/closeButton.module.scss";
import { ReactElement } from "react";

const CloseButton = ({ clickFunction }: CloseButtonType): ReactElement => {
  return (
    <button className={classes.close_button} onClick={clickFunction}>
      ×
    </button>
  );
};

export default CloseButton;
