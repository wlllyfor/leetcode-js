"use client";

import { ReactElement } from "react";
import FormButton from "@/components/atoms/button/formButton";
import ModalDefault from "@/components/atoms/modal/modalDefault";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalText from "@/components/atoms/modal/modalText";
import ModalRowWrapper from "@/components/atoms/modal/modalRowWrapper";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import ModalItemFirstRow from "@/components/molecules/modalItem/mock/modalItemFirstRow";
import ModalItemDetailRow from "@/components/molecules/modalItem/mock/modalItemDetailRow";
import { ModalGroupType } from "@/types/components/molecules/modalGroup/ModalGroupType";

const ModalGroup = ({ isOpen, handleClose }: ModalGroupType): ReactElement => {
  return (
    <ModalDefault isOpen={isOpen} onRequestClose={handleClose}>
      <ModalTitle text={"口座入出金明細登録"} />
      <ModalText text={"拠点名：義鳥   班：A班   スタッフ：山田太郎"} />
      <ModalRowWrapper>
        <ModalItemFirstRow />
        <ModalItemDetailRow />
        <ModalItemDetailRow />
        <ModalItemDetailRow />
      </ModalRowWrapper>
      <ModalText text={"出金額総合計:：2110(円)"} />
      <FormButton
        color={"green"} text={"明細を登録する"} onClick={() => {
        }}
      />
      <ModalCloseButton handleClose={handleClose} />
    </ModalDefault>
  );
};

export default ModalGroup;
