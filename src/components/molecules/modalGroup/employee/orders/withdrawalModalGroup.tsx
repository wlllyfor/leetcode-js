"use client";

import React, { ReactElement } from "react";
import ModalDefault from "@/components/atoms/modal/modalDefault";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import { ModalGroupType } from "@/types/components/molecules/modalGroup/ModalGroupType";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalText from "@/components/atoms/modal/modalText";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import FormButton from "@/components/atoms/button/formButton";
import ModalRowWrapper from "@/components/atoms/modal/modalRowWrapper";
import WithdrawalModalInfoItem from "@/components/molecules/modalItem/employee/orders/withdrawalModalInfoItem";
import WithdrawalModalProductItem from "@/components/molecules/modalItem/employee/orders/withdrawalModalProductItem";
import WithdrawalModalBuyingFreeItem
  from "@/components/molecules/modalItem/employee/orders/withdrawalModalBuyingFreeItem";
import WithdrawalModalShippingFreeItem
  from "@/components/molecules/modalItem/employee/orders/withdrawalModalShippingFreeItem";
import WithdrawalModalOtherItem from "@/components/molecules/modalItem/employee/orders/withdrawalModalOtherItem";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";

const WithdrawalModalGroup = ({
  isOpen, handleClose, checkedOrderDetails,
}: ModalGroupType & {
  checkedOrderDetails: OrderDetailDbTableType[];
}): ReactElement => {
  return (
    <ModalDefault isOpen={isOpen} onRequestClose={handleClose}>
      <ModalTitle text={"注文引落"} />
      <ModalText text={"拠点名：義鳥   班：A班   スタッフ：山田太郎   顧客ID：1"} />
      <ModalRowWrapper>
        <WithdrawalModalInfoItem />
        <WithdrawalModalProductItem />
        <WithdrawalModalBuyingFreeItem />
        <WithdrawalModalShippingFreeItem />
        <WithdrawalModalOtherItem />
      </ModalRowWrapper>
      <ModalText text={"出金額総合計:：2110(円)"} />
      <FlexWrapper>
        <FormButton
          color={"gray"} text={"引落と仕訳を実行する"} onClick={() => {
          }}
        />
      </FlexWrapper>
      <ModalCloseButton handleClose={handleClose} />
    </ModalDefault>
  );
};

export default WithdrawalModalGroup;
