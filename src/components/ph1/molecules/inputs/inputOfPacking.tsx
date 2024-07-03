import { ReactElement } from "react";
import { InputOfPackingType } from "@/types/components/molecules/InputOfPackingType";
import commonClasses from "@/styles/common/page.module.scss";
import classes from "@/styles/components/molecules/inputOfPacking.module.scss";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import InputOfSize from "./inputOfSize";

const InputOfPacking = ({
  weightValue,
  heightValue,
  widthValue,
  depthValue,
  boxesQuantityValue,
  postageValue,
  showLabel,
  weightChangeFunction,
  heightChangeFunction,
  widthChangeFunction,
  depthChangeFunction,
  boxesQuantityChangeFunction,
  postageChangeFunction,
}: InputOfPackingType): ReactElement => {
  const classNamesOfInputAndLabel: string[] = [
    classes.inputAndLabelContent__wrapper,
    commonClasses.flex__wrapper,
    commonClasses.justify_around,
    commonClasses.aline_center,
    commonClasses.flex_nowrap,
  ];
  return (
    <div className={classes.wrapper}>
      <div className={classNamesOfInputAndLabel.join(" ")}>
        <InputAndLabel
          id={"weight"}
          value={weightValue}
          text={"梱包重量"}
          isRequired
          showLabel={showLabel}
          changeFunction={weightChangeFunction}
        />
        <div className={classes.size}>
          <InputOfSize
            id={"size"}
            heightValue={heightValue}
            widthValue={widthValue}
            depthValue={depthValue}
            text={"梱包サイズ"}
            isRequired
            showLabel={showLabel}
            heightChangeFunction={heightChangeFunction}
            widthChangeFunction={widthChangeFunction}
            depthChangeFunction={depthChangeFunction}
          />
        </div>
        <InputAndLabel
          id={"boxesQuantity"}
          value={boxesQuantityValue}
          text={"梱包箱数"}
          showLabel={showLabel}
          changeFunction={boxesQuantityChangeFunction}
        />
        <InputAndLabel
          id={"postage"}
          value={postageValue}
          text={"送料単価"}
          isRequired
          showLabel={showLabel}
          changeFunction={postageChangeFunction}
        />
      </div>
    </div>
  );
};

export default InputOfPacking;
