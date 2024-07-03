"use client";

import { CheckBoxType } from "@/types/components/atoms/CheckBoxType";
import classes from "@/styles/components/atoms/checkbox.module.scss";
import { ReactElement } from "react";

const Checkbox = ({ changeFunction, value, isChecked, id }: CheckBoxType): ReactElement => {
  return (
    <input
      type={"checkbox"}
      className={classes.checkbox}
      onChange={changeFunction}
      value={value}
      checked={isChecked}
      id={id}
    />
  );
};

export default Checkbox;
