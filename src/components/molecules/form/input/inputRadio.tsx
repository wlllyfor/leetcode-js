"use client";

import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import RadioInput from "@/components/atoms/form/radioInput";
import RadioLabel from "@/components/atoms/form/radioLabel";
import { InputRadioType } from "@/types/components/molecules/form/input/InputRadioType";
import { RadioInputType } from "@/types/components/atoms/form/RadioInputType";
import { RadioLabelType } from "@/types/components/atoms/form/RadioLabelType";

const InputRadio = ({ options, name, fontSize, initialValue, onChange }: InputRadioType): ReactElement => {
  const [ selectedOption, setSelectedOption ] = useState<string>(initialValue || "");

  useEffect(() => {
    setSelectedOption(initialValue || "");
  }, [ initialValue ]);

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <>
      {options.map(option => {
        const RadioInputProps: RadioInputType = {
          id: option.id,
          name: name,
          checked: selectedOption === option.id,
          onChange: handleRadioChange,
        };

        const RadioLabelProps: RadioLabelType = {
          htmlFor: option.id,
          text: option.text,
          fontSize: fontSize,
        };

        return (
          <div key={option.id} className={"mt-1 pl-6"}>
            <RadioInput {...RadioInputProps} />
            <RadioLabel {...RadioLabelProps} />
          </div>
        );
      })}
    </>
  );
};

export default InputRadio;
