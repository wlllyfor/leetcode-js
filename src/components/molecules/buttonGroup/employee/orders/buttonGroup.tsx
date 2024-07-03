"use client";

import { ReactElement } from "react";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import ButtonAreaWrapper from "@/components/atoms/div/wrapper/buttonAreaWrapper";
import SelectGroup56 from "@/components/molecules/form/select/selectGroup56";
import NormalClickableButton from "@/components/atoms/button/normalClickableButton";
import { ButtonGroupType } from "@/types/components/molecules/buttonGroup/employee/orders/ButtonGroupType";

const ButtonGroup = ({
  orderSortOptions,
  handleEditButtonClick,
  handleWithdrawalButtonClick,
  handleCartButtonClick,
  handleRefundButtonClick,
  handleCancelButtonClick,
  handleArrivalRequestButtonClick,
  handleShippingOrderButtonClick,
  checkedOrderDetails,
}: ButtonGroupType): ReactElement => {

  const buttonDisabled = checkedOrderDetails.length === 0;
  return (
    <ButtonAreaWrapper>
      <FlexWrapper>
        <SelectGroup56 options={orderSortOptions} text={""} />
        <NormalClickableButton color="yellow" text={"編集"} onClick={handleEditButtonClick} disabled={buttonDisabled} />
        <NormalClickableButton
          color="yellow" text={"引落"} onClick={handleWithdrawalButtonClick}
          disabled={buttonDisabled}
        />
        <NormalClickableButton
          color="yellow" text={"買い物カゴへ追加"} onClick={handleCartButtonClick}
          disabled={buttonDisabled}
        />
        <NormalClickableButton color="red" text={"返金"} onClick={handleRefundButtonClick} disabled={buttonDisabled} />
        <NormalClickableButton
          color="red" text={"キャンセル"} onClick={handleCancelButtonClick}
          disabled={buttonDisabled}
        />
        <NormalClickableButton
          color="lightblue" text={"入荷依頼"} onClick={handleArrivalRequestButtonClick}
          disabled={buttonDisabled}
        />
        <NormalClickableButton
          color="lightblue" text={"出荷依頼"} onClick={handleShippingOrderButtonClick}
          disabled={buttonDisabled}
        />
      </FlexWrapper>
    </ButtonAreaWrapper>
  );
};

export default ButtonGroup;
