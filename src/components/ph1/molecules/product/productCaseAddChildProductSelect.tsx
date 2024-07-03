import classes from "@/styles/components/molecules/productCaseAddChildProductSelect.module.scss";
import { SelectType } from "@/types/components/atoms/SelectType";
import { ReactElement } from "react";
import { ProductCaseAddChildProductSelectType } from "@/types/components/molecules/product/ProductCaseAddChildProductSelectType";
import Select from "@/components/atoms/select";
import { UUID } from "@/lib/uuid";

const ProductCaseAddChildProductSelect = ({
  options,
  changeFunction,
  value,
}: ProductCaseAddChildProductSelectType): ReactElement => {
  const selectProps: SelectType = {
    options: options,
    id: UUID.generate(),
    changeFunction: changeFunction,
    value: value,
  };
  const classNames: string[] = [ classes.inputContent__wrapper ];
  return (
    <div className={classNames.join(" ")}>
      <Select {...selectProps} />
    </div>
  );
};

export default ProductCaseAddChildProductSelect;
