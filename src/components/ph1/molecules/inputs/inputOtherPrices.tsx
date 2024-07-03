import { ChangeEvent, ReactElement } from "react";
import { InputOtherPriceType } from "@/types/components/molecules/InputOtherPriceType";
import commonClasses from "@/styles/common/page.module.scss";
import classes from "@/styles/components/molecules/inputOfAmount.module.scss";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";

const InputOtherPrices = ({
  otherPrice,
  handleOnChangeOtherPricesPrice,
  handleOnChangeOtherPricesName,
  isTop,
  otherPriceTotal,
}: InputOtherPriceType): ReactElement => {
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
          id={"otherPrice.name"}
          value={otherPrice.name}
          text={"その他金額詳細"}
          showLabel={isTop}
          changeFunction={(e: ChangeEvent<HTMLInputElement>) => {
            handleOnChangeOtherPricesName(e, otherPrice.uuid);
          }}
        />
        <InputAndLabel
          id={"otherPrice.price"}
          value={otherPrice.price.toString()}
          text={"その他金額"}
          showLabel={isTop}
          notTop={!isTop}
          changeFunction={(e: ChangeEvent<HTMLInputElement>) => {
            handleOnChangeOtherPricesPrice(e, otherPrice.uuid);
          }}
        />
        {isTop && (
          <InputAndLabel
            id={"otherPrice.total"}
            value={otherPriceTotal.toLocaleString()}
            text={"その他金額合計"}
            isReadOnly
          />
        )}
      </div>
    </>
  );
};

export default InputOtherPrices;
