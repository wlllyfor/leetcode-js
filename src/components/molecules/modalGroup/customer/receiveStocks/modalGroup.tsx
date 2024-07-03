"use client";

import React, { ReactElement } from "react";
import FlexWrapperColumnStart from "@/components/atoms/div/wrapper/flexWrapperColumnStart";
import FormButton from "@/components/atoms/button/formButton";
import ModalDefault from "@/components/atoms/modal/modalDefault";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalText from "@/components/atoms/modal/modalText";
import ModalRowWrapper from "@/components/atoms/modal/modalRowWrapper";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import ModalItem from "@/components/molecules/modalItem/customer/receiveStocks/modalItem";

import { ModalGroupType } from "@/types/components/molecules/modalGroup/ModalGroupType";

const ModalGroup = ({ isOpen, handleClose }: ModalGroupType): ReactElement => {
  return (
    <ModalDefault isOpen={isOpen} onRequestClose={handleClose}>
      <ModalTitle text={"入荷依頼作成"} />
      <ModalText text={"注文ID：YP2-O2"} />
      <ModalRowWrapper>
        <ModalItem />
      </ModalRowWrapper>
      <FlexWrapperColumnStart>
        <FormButton
          color={"green"} text={"保存する"} onClick={() => {
          }}
        />
        <div className="mt-3.5">
          <FormButton
            color={"lightblue"} text={"このまま出荷依頼を作成"} onClick={() => {
            }}
          />
        </div>
      </FlexWrapperColumnStart>
      <ModalCloseButton handleClose={handleClose} />
    </ModalDefault>
  );
};

export default ModalGroup;
