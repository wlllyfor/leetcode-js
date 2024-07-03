"use client";

import H2 from "@/components/atoms/h2";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { EduITModal } from "@/components/molecules/eduITModal";
import { ReactElement, useEffect } from "react";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { useDestroy } from "@/hooks/customer/receiveStock/useDestroy";
import Loading from "@/components/molecules/common/loading";

const ReceiveStockDeleteModal = ({
  prevReceiveStock,
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickDestroyButton,
}: {
  prevReceiveStock: ReceiveStockDbTableType;
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickDestroyButton: () => void;
}): ReactElement => {
  // custom hooks
  const { destroyReceiveStock, isDestroyed, setIsDestroyed, setValidationErrors } = useDestroy();

  // useEffects

  /**
   * 削除後の処理
   */
  useEffect((): void => {
    if (isDestroyed) {
      handleOnClickDestroyButton();
    }
  }, [ isDestroyed, handleOnClickDestroyButton ]);

  /**
   * 初期化
   */
  useEffect((): void => {
    if (isOpen) {
      setValidationErrors(prevState => []);
      setIsDestroyed(prevState => false);
    }
  }, [ isOpen, setValidationErrors, setIsDestroyed, prevReceiveStock ]);

  // loading condition
  if (isOpen && !prevReceiveStock) {
    return <Loading />;
  }

  return (
    <EduITModal isOpen={isOpen}>
      <H2>削除</H2>
      <div className={commonClasses.mt_16}>
        <Paragraph isLeft>
          選択した入荷依頼を削除します。
          <br />
          よろしいでしょうか？
        </Paragraph>
      </div>
      <div className={commonClasses.mt_24}>
        <FormButton
          text={"削除する"}
          color={"red"}
          onClick={async (): Promise<void> => await destroyReceiveStock(prevReceiveStock.id)}
        />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          削除をやめる
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default ReceiveStockDeleteModal;
