import { ReactElement } from "react";
import Input from "@/components/atoms/form/input";
import Label from "@/components/atoms/form/label";
import { LabelType } from "@/types/components/atoms/form/LabelType";
import { InputType } from "@/types/components/atoms/form/InputType";
import { InputOfSizeType } from "@/types/components/molecules/InputOfSizeType";

const InputOfSize = ({
  id,
  text,
  heightValue,
  widthValue,
  depthValue,
  isRequired,
  heightChangeFunction,
  widthChangeFunction,
  depthChangeFunction,
  isSmall,
  isMarginLeft,
  showLabel,
}: InputOfSizeType): ReactElement => {
  const heightInputProps: InputType = {
    id: `${id}-height`,
    value: heightValue,
    isRequired: (isRequired = false),
    isDisabled: false,
    isAutocomplete: false,
    onChange: heightChangeFunction,
  };
  const widthInputProps: InputType = {
    id: `${id}-width`,
    value: widthValue,
    isRequired: (isRequired = false),
    isDisabled: false,
    isAutocomplete: false,
    onChange: widthChangeFunction,
  };
  const depthInputProps: InputType = {
    id: `${id}-depth`,
    value: depthValue,
    isRequired: (isRequired = false),
    isDisabled: false,
    isAutocomplete: false,
    onChange: depthChangeFunction,
  };
  const labelProps: LabelType = {
    htmlFor: id,
    text: text,
    isRequired: (isRequired = false),
  };
  return (
    <div className="">
      {showLabel && <Label {...labelProps} />}
      <div className="flex gap-2 w-56">
        {/* 高さ */}
        <Input {...heightInputProps} />
        {/* 幅 */}
        <Input {...widthInputProps} />
        {/* 奥行き */}
        <Input {...depthInputProps} />
      </div>
    </div>
  );
};

export default InputOfSize;
