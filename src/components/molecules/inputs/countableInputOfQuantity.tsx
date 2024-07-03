"use client";

import { ReactElement } from "react";
import Input from "@/components/atoms/form/input";
import { InputType } from "@/types/components/atoms/form/InputType";
import { CountableInputOfQuantityType } from "@/types/components/molecules/CountableInputOfQuantityType";
import Label from "@/components/atoms/label";
import CountButton from "@/components/atoms/button/countButton";
import { LabelType } from "@/types/components/atoms/LabelType";

const CountableInputOfQuantity = ({
  id,
  value,
  text,
  incrementFunction,
  decrementFunction,
}: CountableInputOfQuantityType): ReactElement => {

  const inputProps: InputType = {
    id: id,
    value: value,
    isRequired: true,
    isDisabled: false,
    isAutocomplete: false,
    readOnly: true,
    onChange: () => {
    },
  };
  const labelProps: LabelType = {
    text: text,
  };

  return (
    <>
      <div>
        <Label {...labelProps} />
        <div className="flex w-28">
          <CountButton isMinus clickFunction={decrementFunction} />
          <div className="mx-[-4px]">
            <Input {...inputProps} />
          </div>
          <CountButton isPlus clickFunction={incrementFunction} />
        </div>
      </div>
    </>
  );
};

export default CountableInputOfQuantity;
