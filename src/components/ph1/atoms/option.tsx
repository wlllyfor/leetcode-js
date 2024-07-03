"use client";

import { OptionType } from "@/types/components/atoms/OptionType";
// import classes from "@/styles/components/atoms/option.module.scss";
import { ReactElement } from "react";

const Option = ({ children, value }: OptionType): ReactElement => {
  return <option value={value}>{children}</option>;
};

export default Option;
