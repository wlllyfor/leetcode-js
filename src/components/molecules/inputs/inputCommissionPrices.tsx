import { ChangeEvent, ReactElement } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import classes from "@/styles/components/molecules/inputOfAmount.module.scss";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import { InputCommissionPriceType } from "@/types/components/molecules/InputCommissionPriceType";

const InputCommissionPrices = ({
  commissionPrice,
  handleOnChangeOtherPricesPrice,
  handleOnChangeOtherPricesName,
  isTop,
  commissionPriceTotal,
}: InputCommissionPriceType): ReactElement => {
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
          id={"commissionPrice.name"}
          value={commissionPrice.name}
          text={"手数料詳細"}
          isRequired
          showLabel={isTop}
          changeFunction={(e: ChangeEvent<HTMLInputElement>) => {
            handleOnChangeOtherPricesName(e, commissionPrice.uuid);
          }}
        />
        <InputAndLabel
          id={"commissionPrice.price"}
          value={commissionPrice.price.toString()}
          text={"手数料"}
          isRequired
          showLabel={isTop}
          changeFunction={(e: ChangeEvent<HTMLInputElement>) => {
            handleOnChangeOtherPricesPrice(e, commissionPrice.uuid);
          }}
        />
        {isTop && (
          <InputAndLabel
            id={"commissionPrice.total"}
            value={commissionPriceTotal.toLocaleString()}
            text={"手数料合計"}
            isRequired
            isReadOnly
          />
        )}
      </div>
    </>
  );
};

export default InputCommissionPrices;
