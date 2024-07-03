import { ReactElement } from "react";
import Label from "@/components/atoms/label";
import Input from "@/components/atoms/input";
import { InputType } from "@/types/components/atoms/InputType";
import { LabelType } from "@/types/components/atoms/LabelType";
import { InputOfCustomerIdType } from "@/types/components/molecules/InputOfCustomerIdType";
import commonClasses from "@/styles/common/page.module.scss";
import classes from "@/styles/components/molecules/inputOfCustomerId.module.scss";

const InputOfCustomerId = ({
  id,
  text,
  value,
  title,
  isRequired,
  changeFunction,
}: InputOfCustomerIdType): ReactElement => {
  const inputProps: InputType = {
    id: id,
    value: value,
    changeFunction: changeFunction,
  };
  const labelProps: LabelType = {
    htmlFor: id,
    text: text,
    isRequired: isRequired,
  };
  return (
    <div className="">
      <Label {...labelProps} />
      <div className={`${classes.input__wrapper}`}>
        <div className={classes.input__head}>{title}</div>
        <Input {...inputProps} />
      </div>
    </div>
  );
};

export default InputOfCustomerId;
