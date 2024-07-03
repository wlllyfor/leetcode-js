"use client";

import { SelectType } from "@/types/components/atoms/SelectType";
import classes from "@/styles/components/atoms/select.module.scss";
import { ReactElement } from "react";
import ReactSelect, { StylesConfig } from "react-select";

const Select = ({
  id,
  options,
  isList,
  isSearch,
  isMulti,
  isDisabled,
  changeFunction,
  value,
  changeMultiItemFunction,
  changeInspectItemFunction,
}: SelectType): ReactElement => {
  const customStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      border: "none",
      "&:hover": {
        cursor: "pointer",
      },
    }),
  };

  const classNames: string[] = [
    classes.select,
    ...(isList ? [ classes.list ] : []),
    ...(isSearch ? [ classes.search ] : []),
  ];

  // 検品用関数が最優先。
  const executableFunction = changeInspectItemFunction || (isMulti ? changeMultiItemFunction : changeFunction);

  const props = {
    id: id,
    instanceId: id,
    options: options,
    className: classNames.join(" "),
    styles: customStyles,
    isMulti: isMulti,
    isDisabled: isDisabled,
    onChange: executableFunction,
    value: value,
  };

  // @ts-expect-error  ごめん;;
  return <ReactSelect {...props} />;
};

export default Select;
