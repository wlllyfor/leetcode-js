import Checkbox from "@/components/atoms/checkbox";
import Label from "@/components/atoms/label";
import { CheckBoxType } from "@/types/components/atoms/CheckBoxType";
import { LabelType } from "@/types/components/atoms/LabelType";
import { ChangeEvent, ReactElement } from "react";
import commonClasses from "@/styles/common/page.module.scss";

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
  const checkboxProps: CheckBoxType = {
    id: id,
    isChecked: checked,
    value: 0,
    changeFunction: changeFunction,
  };
  const labelProps: LabelType = {
    htmlFor: id,
    text: text,
  };
  return (
    <div className={commonClasses.flex__wrapper}>
      <Checkbox {...checkboxProps} />
      <Label {...labelProps} />
    </div>
  );
};

export default CheckAndLabel;
