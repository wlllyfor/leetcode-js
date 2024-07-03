"use client";

import { ReactElement, useEffect, useState } from "react";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import CheckboxInput from "@/components/atoms/form/checkboxInput";
import CheckboxLabel from "@/components/atoms/form/checkboxLabel";
import { InputCheckboxType } from "@/types/components/molecules/form/input/InputCheckboxType";
import { CheckboxInputType } from "@/types/components/atoms/form/CheckboxInputType";
import { CheckboxLabelType } from "@/types/components/atoms/form/CheckboxLabelType";

const InputCheckbox = ({
  id,
  checked: initialChecked,
  text,
  fontSize,
  isReverse,
  changeFunction,
}: InputCheckboxType): ReactElement => {
  const [ checked, setChecked ] = useState<boolean>(initialChecked);

  useEffect(() => {
    setChecked(initialChecked);
  }, [ initialChecked ]);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  const CheckboxInputProps: CheckboxInputType = {
    id: id,
    checked: checked,
    // onClick: handleCheckboxChange,
    onChange: handleCheckboxChange,
  };

  const CheckboxLabelProps: CheckboxLabelType = {
    htmlFor: id,
    text: text,
    fontSize: fontSize,
  };

  useEffect(() => {
    changeFunction && changeFunction(checked);
  }, [ checked, changeFunction ]);

  return (
    <FlexWrapper isReverse={isReverse}>
      <CheckboxInput {...CheckboxInputProps} />
      <CheckboxLabel {...CheckboxLabelProps} />
    </FlexWrapper>
  );
};

export default InputCheckbox;
