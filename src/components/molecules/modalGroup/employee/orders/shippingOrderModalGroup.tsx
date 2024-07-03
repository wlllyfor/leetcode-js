"use client";

import React, { ReactElement } from "react";
import FormButton from "@/components/atoms/button/formButton";
import ModalDefault from "@/components/atoms/modal/modalDefault";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalText from "@/components/atoms/modal/modalText";
import ModalRowWrapper from "@/components/atoms/modal/modalRowWrapper";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import ShippingOrderModalItem from "@/components/molecules/modalItem/employee/orders/shippingOrderModalItem";
import { ModalGroupType } from "@/types/components/molecules/modalGroup/ModalGroupType";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";

const ShippingOrderModalGroup = ({
  isOpen,
  handleClose,
  checkedOrderDetails,
}: ModalGroupType & {
  checkedOrderDetails: OrderDetailDbTableType[];
}): ReactElement => {
  return (
    <ModalDefault isOpen={isOpen} onRequestClose={handleClose}>
      <ModalTitle text={"出荷依頼作成"} />
      <ModalText text={"注文ID：YP2-O2"} />
      <ModalRowWrapper>
        <ShippingOrderModalItem />
      </ModalRowWrapper>
      <FormButton
        color={"green"} text={"保存する"} onClick={() => {
        }}
      />
      <ModalCloseButton handleClose={handleClose} />
    </ModalDefault>
  );
};

export default ShippingOrderModalGroup;
