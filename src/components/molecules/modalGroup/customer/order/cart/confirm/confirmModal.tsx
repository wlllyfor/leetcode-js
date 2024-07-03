"use client";

import { ReactElement } from "react";
import FormButton from "@/components/atoms/button/formButton";
import ModalSm from "@/components/atoms/modal/modalSm";
import ModalTitle from "@/components/atoms/modal/modalTitle";
import ModalCloseButton from "@/components/atoms/modal/modalCloseButton";
import { ModalGroupType } from "@/types/components/molecules/modalGroup/ModalGroupType";
import ContentAreaWrapper from "@/components/atoms/div/wrapper/contentAreaWrapper";
import TextOnlyButton from "@/components/atoms/button/textOnlyButton";
import Paragraph from "@/components/atoms/text/paragraph";
import OrderedList from "@/components/atoms/list/orderedList";
import ListItem from "@/components/atoms/list/listItem";

const ConfirmModal = ({ isOpen, handleClose }: ModalGroupType): ReactElement => {
  return (
    <ModalSm isOpen={isOpen} onRequestClose={handleClose}>
      <ModalTitle text={"バリエーション変更"} />
      <ContentAreaWrapper>
        <div className="w-80 mx-auto">
          <OrderedList>
            <ListItem>
              <Paragraph
                fontSize="12px"
                text="仕入元から弊社への国内の送料が発生する場合がございます。その場合は注文提出後、買付が完了し、商品が仕入れ先より出荷されましたタイミングで注文履歴から国内送料の確認可能となります。"
              />
            </ListItem>
            <ListItem>
              <Paragraph
                fontSize="12px"
                text="店舗によってリアルタイムの販売で在庫切れになる可能性もございます。その場合はスタッフの方で別の仕入れ先または類似品をご提案も可能です頂きますのでご安心くださいませ。"
              />
            </ListItem>
            <ListItem>
              <Paragraph
                fontSize="12px"
                text="仕入れ先への支払い条件に生産前に頭金を支払い、納品完了後に残金を支払うという事もございます。注文提出後に注文履歴より商品代金の支払い状況のご確認も可能でございます。"
              />
            </ListItem>
          </OrderedList>
        </div>
      </ContentAreaWrapper>
      <ContentAreaWrapper>
        <div className="w-fit mx-auto">
          <FormButton color={"green"} text={"注文する"} />
        </div>
      </ContentAreaWrapper>
      <ModalCloseButton handleClose={handleClose} />
      <div className="text-center">
        <TextOnlyButton text={"注文確認画面へ戻る"} hasUnderLine clickFunction={handleClose} />
      </div>
    </ModalSm>
  );
};

export default ConfirmModal;
