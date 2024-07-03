"use client";

import { InputType } from "@/types/components/atoms/InputType";
import classes from "@/styles/components/atoms/input.module.scss";
import { ReactElement } from "react";

const Input = ({
  id,
  value,
  inputType,
  changeFunction,
  forSearch,
  width15Per,
  width50Per,
  isReadOnly = false,
  placeholder,
  name,
}: InputType): ReactElement => {
  const classNames: string[] = [
    classes.input,
    ...(forSearch ? [ classes.search ] : []),
    ...(width15Per ? [ classes.list ] : []),
    ...(width50Per ? [ classes.mark ] : []),
  ];
  return (
    <input
      type={inputType ?? "text"}
      className={classNames.join(" ")}
      onChange={changeFunction}
      value={value}
      id={id}
      placeholder={placeholder}
      name={name}
      readOnly={isReadOnly}
    />
  );
};

export default Input;
