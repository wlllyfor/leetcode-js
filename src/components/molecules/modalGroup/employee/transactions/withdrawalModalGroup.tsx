"use client";

import { ReactElement, useState } from "react";
import { UUID } from "@/lib/uuid";
import FormButton from "@/components/atoms/button/formButton";
import ModalDefault from "@/components/atoms/modal/modalDefault";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalText from "@/components/atoms/modal/modalText";
import ModalRowWrapper from "@/components/atoms/modal/modalRowWrapper";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import WithdrawalModalItemSelect
  from "@/components/molecules/modalItem/employee/transactions/withdrawalModalItemSelect";
import WithdrawalModalItem from "@/components/molecules/modalItem/employee/transactions/withdrawalModalItem";
import { ItemType } from "@/types/components/molecules/modalItem/employee/ItemType";
import { ModalGroupType } from "@/types/components/molecules/modalGroup/ModalGroupType";

const WithdrawalModalGroup = ({ isOpen, handleClose }: ModalGroupType): ReactElement => {
  const [ items, setItems ] = useState<ItemType[]>([ { key: UUID.generate(), isFirst: true } ]); // 初期状態は1つのWithdrawalModalItem

  const addItem = () => {
    setItems([ ...items, { key: UUID.generate(), isFirst: false } ]); // 新しいWithdrawalModalItemを追加
  };
  return (
    <ModalDefault isOpen={isOpen} onRequestClose={handleClose}>
      <ModalTitle text={"顧客残高出金登録"} />
      <ModalText text={"拠点名：義鳥   班：A班   スタッフ：山田太郎   顧客ID：1"} />
      <ModalRowWrapper>
        <WithdrawalModalItemSelect />
        {items.map((item, index) => (
          <WithdrawalModalItem key={item.key} isFirst={index === 0} handleAddItem={addItem} />
        ))}
      </ModalRowWrapper>
      <ModalText text={"出金額総合計:：2110(円)"} />
      <FormButton
        color={"green"} text={"引落と仕訳を実行する"} onClick={() => {
        }}
      />
      <ModalCloseButton handleClose={handleClose} />
    </ModalDefault>
  );
};

export default WithdrawalModalGroup;
