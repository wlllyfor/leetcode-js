import classes from "@/styles/components/molecules/productCaseAddChildProductInput.module.scss";
import Input from "@/components/atoms/input";
import { InputType } from "@/types/components/atoms/InputType";
import { ReactElement } from "react";
import { ProductCaseAddChildProductInputType } from "@/types/components/molecules/product/ProductCaseAddChildProductInputType";

const ProductCaseAddChildProductInput = ({
  id,
  inputType,
  value,
  changeFunction,
}: ProductCaseAddChildProductInputType): ReactElement => {
  const inputProps: InputType = {
    id: id,
    value: value,
    inputType: inputType,
    changeFunction: changeFunction,
  };
  const classNames: string[] = [ classes.inputContent__wrapper ];
  return (
    <div className={classNames.join(" ")}>
      <Input {...inputProps} />
    </div>
  );
};

export default ProductCaseAddChildProductInput;
