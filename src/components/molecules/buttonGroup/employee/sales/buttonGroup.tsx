"use client";

import { ReactElement } from "react";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import ButtonAreaWrapper from "@/components/atoms/div/wrapper/buttonAreaWrapper";
import NormalClickableButton from "@/components/atoms/button/normalClickableButton";
import Input from "@/components/atoms/form/input";
import { ButtonGroupType } from "@/types/components/molecules/buttonGroup/employee/sales/ButtonGroupType";

const ButtonGroup = ({ handleModalButtonClick, handleCalcButtonClick }: ButtonGroupType): ReactElement => {
  return (
    <ButtonAreaWrapper>
      <FlexWrapper>
        <NormalClickableButton color="lightblue" text={"売上登録"} onClick={handleModalButtonClick} />
        <div className="ml-5 flex items-end">
          <Input id={"month"} value={""} isAutocomplete={false} isRequired={false} isDisabled={false} />
          <span className="ml-1">月</span>
        </div>
        {/* Todo: APIつなぎ込時に動く？ので後ほどClickイベントを設定 */}
        <NormalClickableButton color="lightblue" text={"利益額計算"} onClick={handleCalcButtonClick} />
        <div className="flex ml-2.5">
          <div className="w-48">
            <span>支出合計：</span>
            <span>¥000000</span>
          </div>
          <div className="w-48">
            <span>売上合計：</span>
            <span>¥000000</span>
          </div>
          <div className="w-48">
            <span>利益合計：</span>
            <span>¥000000</span>
          </div>
        </div>
      </FlexWrapper>
    </ButtonAreaWrapper>
  );
};

export default ButtonGroup;
