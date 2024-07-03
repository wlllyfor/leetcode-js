"use client";

import classes from "@/styles/components/molecules/selectAndLabel.module.scss";
import Label from "@/components/atoms/label";
import Select from "@/components/atoms/select";
import { SelectType } from "@/types/components/atoms/SelectType";
import { LabelType } from "@/types/components/atoms/LabelType";
import { ReactElement } from "react";
import { SelectAndLabelType } from "@/types/components/molecules/SelectAndLabelType";
import { UUID } from "@/lib/uuid";

const SelectAndLabel = ({
  id,
  text,
  options,
  isRequired,
  isSmall,
  isLarge,
  isList,
  isSearch,
  isMulti,
  isTopItem,
  isDisabled,
  showLabel = true,
  changeFunction,
  changeMultiItemFunction,
  changeInspectItemFunction,
  value,
}: SelectAndLabelType): ReactElement => {
  const labelProps: LabelType = {
    htmlFor: "",
    text: text,
    isRequired: isRequired,
  };
  const selectProps: SelectType = {
    id: id || UUID.generate(),
    options: options,
    isList: isList,
    isSearch: isSearch,
    isMulti: isMulti,
    isDisabled: isDisabled,
    changeFunction: changeFunction,
    changeMultiItemFunction: changeMultiItemFunction,
    changeInspectItemFunction: changeInspectItemFunction,
    value: value,
  };
  const classNames: string[] = [
    ...(!isTopItem ? [ classes.inputContent__wrapper ] : []),
    ...(isSmall ? [ classes.small ] : []),
    ...(isLarge ? [ classes.large ] : []),
  ];

  return (
    <div className={classNames.join(" ")}>
      {showLabel && <Label {...labelProps} />}
      <Select {...selectProps} />
    </div>
  );
};

export default SelectAndLabel;
