"use client";

import H2 from "@/components/atoms/h2";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { ReactElement, useEffect } from "react";
import { EduITModal } from "@/components/molecules/eduITModal";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";
import { useDestroy } from "@/hooks/customer/leaveStock/useDestroy";
import Loading from "@/components/molecules/common/loading";

const LeaveStockDeleteModal = ({
  prevLeaveStock,
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickDestroyButton,
}: {
  prevLeaveStock: LeaveStockTableDbType;
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickDestroyButton: () => void;
}): ReactElement => {
  // custom hooks
  const { destroyLeaveStock, setValidationErrors, setIsDestroyed, isDestroyed } = useDestroy();

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
  }, [ isOpen, setValidationErrors, setIsDestroyed, prevLeaveStock ]);

  // loading condition
  if (isOpen && !prevLeaveStock) {
    return <Loading />;
  }

  return (
    <EduITModal isOpen={isOpen}>
      <H2>削除の際の注意事項</H2>
      <div className={commonClasses.mt_16}>
        <Paragraph isLeft>
          選択した出荷依頼を削除します。
          <br />
          よろしいでしょうか？
        </Paragraph>
      </div>
      <div className={commonClasses.mt_24}>
        <FormButton
          text={"同意して削除をする"}
          color={"red"}
          onClick={async (): Promise<void> => await destroyLeaveStock(prevLeaveStock.id)}
        />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          削除をやめる
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default LeaveStockDeleteModal;
