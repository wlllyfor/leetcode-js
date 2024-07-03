"use client";

import React, { ChangeEvent, ReactElement } from "react";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import FormButton from "@/components/atoms/button/formButton";
import ModalDefault from "@/components/atoms/modal/modalDefault";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalText from "@/components/atoms/modal/modalText";
import ModalRowWrapper from "@/components/atoms/modal/modalRowWrapper";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import EditModalItem from "@/components/molecules/modalItem/employee/orders/editModalItem";
import { ModalGroupType } from "@/types/components/molecules/modalGroup/ModalGroupType";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import Paragraph from "@/components/atoms/paragraph";
import { UUID } from "@/lib/uuid";

const EditModalGroup = ({
  isOpen,
  handleClose,
  checkedOrderDetails,
  orderStatusOptions,
  handleOrderStatusOnChange,
  handleMallOrderIdOnChange,
  handleShopNameOnChange,
  handleProductNameOnChange,
  handleVariationOnChange,
  handleUnitPriceOnChange,
  handleQuantityOnChange,
  handlePostageOnChange,
  handlePublicRemarksOnChange,
  handlePublicRemarksFileOnChange,
  handleReceiptOnChange,
  handleReceiptFileOnChange,
  handleOtherNameOnChange,
  handleOtherUnitPriceOnChange,
  handleOtherQuantityOnChange,
  putOrderDetails,
  validationErrors,
}: ModalGroupType & {
  checkedOrderDetails: OrderDetailDbTableType[];
  orderStatusOptions: ReactSelectOption[];
  handleOrderStatusOnChange: (e: ReactSelectOption, uuid: string) => void;
  handleMallOrderIdOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handleShopNameOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handleProductNameOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handleVariationOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handleUnitPriceOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handleQuantityOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handlePostageOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handlePublicRemarksOnChange: (e: ChangeEvent<HTMLTextAreaElement>, uuid: string) => void;
  handlePublicRemarksFileOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handleReceiptOnChange: (e: ChangeEvent<HTMLTextAreaElement>, uuid: string) => void;
  handleReceiptFileOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string) => void;
  handleOtherNameOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string, orderOtherUuid: string) => void;
  handleOtherUnitPriceOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string, orderOtherUuid: string) => void;
  handleOtherQuantityOnChange: (e: ChangeEvent<HTMLInputElement>, uuid: string, orderOtherUuid: string) => void;
  putOrderDetails: () => void;
  validationErrors: string[];
}): ReactElement => {
  return (
    <ModalDefault isOpen={isOpen} onRequestClose={handleClose}>
      <ModalTitle text={"注文編集"} />
      <ModalText text={"拠点名：義鳥   班：A班   スタッフ：山田太郎   顧客ID：1"} />
      {validationErrors.map(error => {
        return <Paragraph key={UUID.generate()}>{error}</Paragraph>;
      })}
      <ModalRowWrapper>
        {checkedOrderDetails.map(orderDetail => {
          return <EditModalItem
            key={orderDetail.uuid} orderDetail={orderDetail} orderStatusOptions={orderStatusOptions}
            handleOrderStatusOnChange={handleOrderStatusOnChange}
            handleMallOrderIdOnChange={handleMallOrderIdOnChange}
            handleShopNameOnChange={handleShopNameOnChange}
            handleProductNameOnChange={handleProductNameOnChange}
            handleUnitPriceOnChange={handleUnitPriceOnChange}
            handleVariationOnChange={handleVariationOnChange}
            handleQuantityOnChange={handleQuantityOnChange}
            handlePostageOnChange={handlePostageOnChange}
            handlePublicRemarksOnChange={handlePublicRemarksOnChange}
            handlePublicRemarksFileOnChange={handlePublicRemarksFileOnChange}
            handleReceiptOnChange={handleReceiptOnChange}
            handleReceiptFileOnChange={handleReceiptFileOnChange}
            handleOtherNameOnChange={handleOtherNameOnChange}
            handleOtherUnitPriceOnChange={handleOtherUnitPriceOnChange}
            handleOtherQuantityOnChange={handleOtherQuantityOnChange}
          />;
        })}
      </ModalRowWrapper>
      <FlexWrapper>
        <FormButton
          color={"green"} text={"保存する"} onClick={putOrderDetails}
        />
        <FormButton
          color={"green"} text={"引落へ"} onClick={() => {
          }}
        />
      </FlexWrapper>
      <ModalCloseButton handleClose={handleClose} />
    </ModalDefault>
  );
};

export default EditModalGroup;
