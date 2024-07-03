"use client";

import { SortType } from "@/types/components/molecules/SortType";
import classes from "@/styles/components/molecules/sort.module.scss";
import { ReactElement } from "react";
import ReactSelect, { StylesConfig } from "react-select";

const Sort = ({
  id,
  options,
  isMulti,
  changeFunction,
  value,
  changeMultiItemFunction,
  placeholder,
}: SortType): ReactElement => {
  const classNames: string[] = [ classes.select ];

  const customStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      border: "none",
      height: 30,
      minHeight: 30,
      "&:hover": {
        cursor: "pointer",
      },
    }),
  };

  const props = {
    id: id,
    instanceId: id,
    options: options,
    className: classNames.join(" "),
    styles: customStyles,
    isMulti: isMulti,
    onChange: isMulti ? changeMultiItemFunction : changeFunction,
    ...(value && { defaultValue: value }),
    placeholder: placeholder,
  };

  // @ts-expect-error  ごめん;;
  return <ReactSelect {...props} />;
};

export default Sort;
