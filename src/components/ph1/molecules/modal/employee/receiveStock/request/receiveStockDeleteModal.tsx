"use client";

import H2 from "@/components/atoms/h2";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { ReactElement, useEffect } from "react";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { EduITModal } from "@/components/molecules/eduITModal";
import { useDestroy } from "@/hooks/employee/receiveStock/useDestroy";
import Error422 from "@/components/molecules/errors/error422";

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
  // customHooks
  const { destroyReceiveStock, validationErrors, setValidationErrors, isDestroyed, setIsDestroyed } = useDestroy();

  // use effects

  /**
   * 初期化
   */
  useEffect((): void => {
    setValidationErrors(prevState => []);
    setIsDestroyed(prevState => false);
  }, [ setValidationErrors, setIsDestroyed ]);

  /**
   * 削除状況の監視
   */
  useEffect((): void => {
    if (isOpen && isDestroyed) {
      handleOnClickDestroyButton();
    }
  }, [ isOpen, isDestroyed, handleOnClickDestroyButton ]);

  return (
    <EduITModal isOpen={isOpen}>
      <H2>削除処理</H2>
      <Error422 errors={validationErrors} />
      <div className={commonClasses.mt_16}>
        <Paragraph isSmall isLeft>
          選択中の入荷依頼を削除します。よろしいですか？
        </Paragraph>
      </div>
      <div className={commonClasses.mt_24}>
        <FormButton
          text={"削除する"}
          color={"red"}
          onClick={async (): Promise<void> => {
            await destroyReceiveStock(prevReceiveStock.id);
          }}
        />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          入荷依頼管理へ戻る
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default ReceiveStockDeleteModal;
