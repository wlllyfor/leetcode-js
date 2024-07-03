import classes from "@/styles/components/molecules/radioButton.module.scss";
import Label from "@/components/atoms/label";
import Input from "@/components/atoms/input";
import { InputType } from "@/types/components/atoms/InputType";
import { LabelType } from "@/types/components/atoms/LabelType";
import { ReactElement } from "react";
import { RadioButtonType } from "@/types/components/molecules/RadioButtonType";

const RadioButton = ({
  id,
  text,
  value,
  isRequired,
  isReadOnly = false,
  title,
  name,
  changeFunction,
}: RadioButtonType): ReactElement => {
  const inputProps: InputType = {
    id: id,
    value: value,
    inputType: "radio",
    name: name,
    changeFunction: changeFunction,
    isReadOnly: isReadOnly,
  };
  const labelProps: LabelType = {
    htmlFor: id,
    text: text,
    isRequired: isRequired,
  };

  return (
    <div className={classes.inputContent__wrapper}>
      <Input {...inputProps} />
      <Label {...labelProps} />
      {title && <div className={classes.title__wrapper}>{title}</div>}
    </div>
  );
};

export default RadioButton;
