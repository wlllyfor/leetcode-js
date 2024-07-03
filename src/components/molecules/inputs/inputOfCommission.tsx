import { ReactElement } from "react";
import { InputOfCommissionType } from "@/types/components/molecules/InputOfCommissionType";
import commonClasses from "@/styles/common/page.module.scss";
import classes from "@/styles/components/molecules/inputOfCommission.module.scss";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";

const InputOfCommission = ({
  name,
  price,
  quantity,
  nameChangeFunction,
  priceChangeFunction,
  quantityChangeFunction,
  commissionTotal,
  showLabel,
}: InputOfCommissionType): ReactElement => {
  const classNamesOfInputAndLabel: string[] = [
    classes.inputAndLabelContent__wrapper,
    commonClasses.flex__wrapper,
    commonClasses.justify_around,
    commonClasses.aline_center,
    commonClasses.flex_nowrap,
  ];
  return (
    <>
      <div className={classNamesOfInputAndLabel.join(" ")}>
        <InputAndLabel
          id={"name"}
          value={name}
          text={"手数料詳細"}
          isRequired
          showLabel={showLabel}
          changeFunction={nameChangeFunction}
        />
        <InputAndLabel
          id={"price"}
          value={price}
          text={"手数料"}
          isRequired
          showLabel={showLabel}
          changeFunction={priceChangeFunction}
        />
        <InputAndLabel
          id={"quantity"}
          value={quantity}
          text={"数量"}
          showLabel={showLabel}
          changeFunction={quantityChangeFunction}
        />
        {showLabel && (
          <InputAndLabel
            id={"commissionTotal"}
            value={commissionTotal.toLocaleString()}
            text={"手数料合計"}
            isRequired
            isReadOnly={true}
          />
        )}
      </div>
    </>
  );
};

export default InputOfCommission;
