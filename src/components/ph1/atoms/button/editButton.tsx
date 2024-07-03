"use client";

import { EditButtonType } from "@/types/components/atoms/button/EditButtonType";
import classes from "@/styles/components/atoms/button/editButton.module.scss";
import Img from "@/components/atoms/img";
import { ReactElement } from "react";
import icon from "@/resource/img/icon_edit.svg";

const EditButton = ({ clickFunction }: EditButtonType): ReactElement => {
  const classNames: string[] = [ classes.button ];
  return (
    <button className={classNames.join(" ")} onClick={clickFunction}>
      <Img src={icon} alt="icon" className={classes.button__icon} />
    </button>
  );
};

export default EditButton;
