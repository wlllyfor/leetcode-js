"use client";

import H2 from "@/components/atoms/h2";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { EduITModal } from "@/components/molecules/eduITModal";
import { ReactElement, useEffect } from "react";
import { useCancel } from "@/hooks/customer/order/useCancel";

const OrderCancelModal = ({
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickCancelButton,
  checkedIdList,
}: {
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickCancelButton: () => void;
  checkedIdList: number[];
}): ReactElement => {
  // custom hooks
  const { setSrcIdList, postCancel, isStored, setIsStored } = useCancel();

  // useEffects
  useEffect((): void => {
    if (isOpen) {
      setSrcIdList(prevState => checkedIdList);
      setIsStored(prevState => false);
    }
  }, [ isOpen, setSrcIdList, setIsStored, checkedIdList ]);

  useEffect((): void => {
    if (isOpen && isStored) {
      handleOnClickCancelButton();
    }
  }, [ isOpen, isStored, handleOnClickCancelButton ]);

  return (
    <EduITModal isOpen={isOpen}>
      <H2>キャンセルの際の注意事項</H2>
      <div className={commonClasses.mt_16}>
        <Paragraph isLeft>
          キャンセルが完了しますと、注文履歴から自動的に削除されます。
          問題ないか確認のうえ、キャンセルをする場合は以下のボタンを押してください。
        </Paragraph>
      </div>
      <div className={commonClasses.mt_24}>
        <FormButton text={"同意してキャンセル依頼をする"} color={"red"} onClick={postCancel} />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          キャンセルをやめる
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default OrderCancelModal;
