import { ReactElement } from "react";
import Label from "@/components/atoms/label";
import Input from "@/components/atoms/input";
import { InputType } from "@/types/components/atoms/InputType";
import { LabelType } from "@/types/components/atoms/LabelType";
import { InputOfSizeType } from "@/types/components/molecules/InputOfSizeType";
import commonClasses from "@/styles/common/page.module.scss";
import classes from "@/styles/components/molecules/inputOfSize.module.scss";

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
    changeFunction: heightChangeFunction,
  };
  const widthInputProps: InputType = {
    id: `${id}-width`,
    value: widthValue,
    changeFunction: widthChangeFunction,
  };
  const depthInputProps: InputType = {
    id: `${id}-depth`,
    value: depthValue,
    changeFunction: depthChangeFunction,
  };
  const labelProps: LabelType = {
    htmlFor: id,
    text: text,
    isRequired: isRequired,
  };
  const classNames: string[] = [
    classes.inputContent__wrapper,
    ...(isMarginLeft ? [ commonClasses.ml_16 ] : []),
    ...(isSmall ? [ classes.small ] : []),
  ];
  return (
    <div className={classNames.join(" ")}>
      {showLabel && <Label {...labelProps} />}
      {/* 高さ */}
      <Input {...heightInputProps} />
      {/* 幅 */}
      <Input {...widthInputProps} />
      {/* 奥行き */}
      <Input {...depthInputProps} />
    </div>
  );
};

export default InputOfSize;
