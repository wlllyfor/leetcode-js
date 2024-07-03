import classes from "@/styles/components/molecules/inputAndLabel.module.scss";
import Label from "@/components/atoms/label";
import Input from "@/components/atoms/input";
import { InputType } from "@/types/components/atoms/InputType";
import { LabelType } from "@/types/components/atoms/LabelType";
import { ReactElement } from "react";
import { InputAndLabelType } from "@/types/components/molecules/InputAndLabelType";

const InputAndLabel = ({
  id,
  text,
  inputType,
  value,
  isRequired,
  isReadOnly = false,
  isSmall,
  isLarge,
  isHalf,
  notTop,
  showLabel = true,
  title,
  placeholder,
  changeFunction,
}: InputAndLabelType): ReactElement => {
  const inputProps: InputType = {
    id: id,
    value: value,
    inputType: inputType,
    changeFunction: changeFunction,
    isReadOnly: isReadOnly,
    placeholder: placeholder,
  };
  const labelProps: LabelType = {
    htmlFor: id,
    text: text,
    isRequired: isRequired,
  };
  const classNames: string[] = [
    classes.inputContent__wrapper,
    ...(isSmall ? [ classes.small ] : []),
    ...(isLarge ? [ classes.large ] : []),
    ...(isHalf ? [ classes.half ] : []),
    ...(!showLabel ? [ classes.unShowLabel ] : []),
    ...(notTop ? [ classes.notTop ] : []),
    ...(title ? [ classes.hasTitle ] : []),
  ];
  return (
    <div className={classNames.join(" ")}>
      {showLabel && <Label {...labelProps} />}
      <Input {...inputProps} />
      {title && <div className={classes.title__wrapper}>{title}</div>}
    </div>
  );
};

export default InputAndLabel;
