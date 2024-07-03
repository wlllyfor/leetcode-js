"use client";

import React, { ReactElement, useEffect } from "react";
import FormButton from "@/components/atoms/button/formButton";
import ModalDefault from "@/components/atoms/modal/modalDefault";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalText from "@/components/atoms/modal/modalText";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import ModalItem from "@/components/molecules/modalItem/employee/receiveStocks/modalItem";
import { ModalGroupType } from "@/types/components/molecules/modalGroup/ModalGroupType";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";


const ModalGroup = ({ isOpen, selectedReceiveStock, handleClose }: {
  isOpen: boolean;
  selectedReceiveStock: ReceiveStockDbTableType;
  handleClose: () => void;
}) : ReactElement => {
  const handleDetailAddition = () => {
    alert("明細の追加を行います");
  };

  useEffect((): void => {
    // handleClose();
  }, [ handleClose ]);

  return (
    <ModalDefault isOpen={isOpen} onRequestClose={handleClose}>
      <ModalTitle text={"入荷依頼編集"} />
      <ModalText text={"入荷ID：" + selectedReceiveStock.code} />
      <div className="min-w-[1750px]">
        <ModalItem handleDetailAddition={handleDetailAddition} selectedReceiveStock={selectedReceiveStock}/>
        <FlexWrapper>
          <FormButton
            color={"green"} text={"保存する"} onClick={() => {
            }}
          />
          <FormButton
            color={"gray"} text={"引落と仕訳を実行する"} onClick={() => {
            }}
          />
        </FlexWrapper>
      </div>
      <ModalCloseButton handleClose={handleClose} />
    </ModalDefault>
  );
};

export default ModalGroup;
