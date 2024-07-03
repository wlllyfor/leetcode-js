import CheckboxInput from "@/components/atoms/form/checkboxInput";
import CheckboxLabel from "@/components/atoms/form/checkboxLabel";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import { CheckboxInputType } from "@/types/components/atoms/form/CheckboxInputType";
import { CheckboxLabelType } from "@/types/components/atoms/form/CheckboxLabelType";
import { ChangeEvent, ReactElement } from "react";

const CheckAndLabel = ({
  id,
  text,
  checked,
  changeFunction,
}: {
  id: string;
  text: string;
  checked: boolean;
  changeFunction?: (e: ChangeEvent<HTMLInputElement>) => void;
}): ReactElement => {
  const checkboxProps: CheckboxInputType = {
    id: id,
    checked: checked,
    value: 0,
    onChange: changeFunction,
  };
  const labelProps: CheckboxLabelType = {
    htmlFor: id,
    text: text,
  };
  return (
    <FlexWrapper>
      <CheckboxInput {...checkboxProps} />
      <CheckboxLabel {...labelProps} />
    </FlexWrapper>
  );
};

export default CheckAndLabel;
