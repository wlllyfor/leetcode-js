"use client";

import { DeleteButtonType } from "@/types/components/atoms/button/DeleteButtonType";
import classes from "@/styles/components/atoms/button/deleteButton.module.scss";
import Img from "@/components/atoms/img";
import buttonImg from "@/resource/img/delete_button.svg";
import { ReactElement } from "react";

const DeleteButton = ({ clickFunction }: DeleteButtonType): ReactElement => {
  const classNames: string[] = [ classes.delete_button ];
  return (
    <button className={classNames.join(" ")} onClick={clickFunction}>
      <Img src={buttonImg} alt="×" className={classes.button__icon} width={32} height={32} />
    </button>
  );
};

export default DeleteButton;
