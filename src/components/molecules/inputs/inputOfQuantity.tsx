"use client";

import { ChangeEvent, ReactElement, useState } from "react";
import Input from "@/components/atoms/input";
import { InputType } from "@/types/components/atoms/InputType";
import { CountableInputOfQuantityType } from "@/types/components/molecules/CountableInputOfQuantityType";
import classes from "@/styles/components/molecules/inputOfQuantity.module.scss";
import Label from "@/components/atoms/label";
import CountButton from "@/components/atoms/button/countButton";
import { LabelType } from "@/types/components/atoms/LabelType";
import { Integer } from "@/lib/integer";

const InputOfQuantity = ({
  id,
  value,
  text,
  incrementFunction,
  decrementFunction,
}: CountableInputOfQuantityType): ReactElement => {
  const [ count, setCount ] = useState<number>(0);


  const handleOnChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Integer.parseIntExceptZero(e.target.value);
    if (value >= 0) {
      setCount(value);
    }
  };

  const inputProps: InputType = {
    id: id,
    value: count,
    changeFunction: handleOnChangeCount,
  };
  const labelProps: LabelType = {
    text: text,
  };
  const classNamesOfInputAndLabel: string[] = [ classes.inputAndLabelContent__wrapper ];
  const classNamesOfInputAndButton: string[] = [ classes.inputAndButtonContent__wrapper ];

  return (
    <>
      <div className={classNamesOfInputAndLabel.join(" ")}>
        <Label {...labelProps} />
        <div className={classNamesOfInputAndButton.join(" ")}>
          <CountButton isMinus clickFunction={decrementFunction} />
          <Input {...inputProps} />
          <CountButton isPlus clickFunction={incrementFunction} />
        </div>
      </div>
    </>
  );
};

export default InputOfQuantity;
