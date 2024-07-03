import { ReactElement } from "react";
import Label from "@/components/atoms/label";
import Input from "@/components/atoms/input";
import { InputType } from "@/types/components/atoms/InputType";
import { LabelType } from "@/types/components/atoms/LabelType";
import { InputOfRemarkType } from "@/types/components/molecules/InputOfRemarkType";
import commonClasses from "@/styles/common/page.module.scss";
import classes from "@/styles/components/molecules/inputOfRemark.module.scss";
import FileUploadButton from "@/components/molecules/fileUploadButton";

const InputOfRemark = ({
  id,
  text,
  value,
  isRequired,
  changeTextFunction,
  changeFileFunction,
  isSmall,
  isMarginLeft,
  isCustomerOrder,
}: InputOfRemarkType): ReactElement => {
  const inputProps: InputType = {
    id: id,
    value: value,
    changeFunction: changeTextFunction,
  };
  const labelProps: LabelType = {
    htmlFor: id,
    text: text,
    isRequired: isRequired,
  };
  const classNames: string[] = [
    classes.inputContent__wrapper,
    ...(isCustomerOrder ? [ classes.customerOrder ] : []),
    ...(isMarginLeft ? [ commonClasses.ml_16 ] : []),
    ...(isSmall ? [ classes.small ] : []),
  ];

  const classNameWrapper = [
    commonClasses.flex__wrapper,
    commonClasses.aline_center,
    commonClasses.flex_nowrap,
    commonClasses.fileUploadWrapper,
  ];

  return (
    <div className={classNames.join(" ")}>
      <Label {...labelProps} />
      <div className={classNameWrapper.join(" ")}>
        <Input {...inputProps} />
        {/* <Img src={Icon} alt={""} />
         <Input inputType={"file"} changeFunction={changeFileFunction} /> */}
        <FileUploadButton id={`file-${id}`} changeFunction={changeFileFunction} />
      </div>
    </div>
  );
};

export default InputOfRemark;
