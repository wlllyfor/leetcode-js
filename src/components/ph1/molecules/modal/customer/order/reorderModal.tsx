"use client";

import H2 from "@/components/atoms/h2";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { EduITModal } from "@/components/molecules/eduITModal";
import { ReactElement, useEffect } from "react";
import Span from "@/components/atoms/span";
import { useReOrder } from "@/hooks/customer/order/useReOrder";

const ReorderModal = ({
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickReorderButton,
  checkedIdList,
}: {
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickReorderButton: () => void;
  checkedIdList: number[];
}): ReactElement => {
  // custom hooks
  const { setSrcIdList, postReOrder, isStored, setIsStored } = useReOrder();

  // useEffects
  useEffect((): void => {
    if (isOpen) {
      setSrcIdList(prevState => checkedIdList);
      setIsStored(prevState => false);
    }
  }, [ isOpen, setSrcIdList, setIsStored, checkedIdList ]);

  useEffect((): void => {
    if (isOpen && isStored) {
      handleOnClickReorderButton();
    }
  }, [ isOpen, isStored, handleOnClickReorderButton ]);

  return (
    <EduITModal isOpen={isOpen}>
      <H2>再注文の際の注意事項</H2>
      <div className={commonClasses.mt_16}>
        <Paragraph isLeft>
          こちらの金額は<Span isBold>概算の計算</Span>
          となります。再注文という事で、
          同じショップで同じ条件購入を意味しておりますが、時期により値段の差異が生じたり商品の取り扱いがなくなっている場合もございます。その場合はご連絡をさせて頂きます。
          <br />
          その他費用の項目につきましても検品終了後に費用を記載させて頂きますので、 こちらの合計金額につきましては
          <Span isBold>概算</Span>
          という事をご了承お願いします。
          <br />
          <br />
          事前に検品の見積もりも可能でございますのでご希望の場合は専用チャッワークでお見積り頂きますようお願いします。
          注文完了後、注文履歴にて詳細を確認できます。
        </Paragraph>
      </div>
      <div className={commonClasses.mt_24}>
        <FormButton text={"同意して再注文をする"} color={"green"} onClick={postReOrder} />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          注文をやめる
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default ReorderModal;
