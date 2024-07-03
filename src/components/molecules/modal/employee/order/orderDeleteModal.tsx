"use client";

import H2 from "@/components/atoms/h2";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { ReactElement, useEffect } from "react";
import { EduITModal } from "@/components/molecules/eduITModal";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";
import { useDestroy } from "@/hooks/employee/orderDetail/useDestroy";
import Error422 from "@/components/molecules/errors/error422";

const OrderDeleteModal = ({
  prevOrderDetail,
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickDestroyButton,
}: {
  prevOrderDetail: OrderDetailDbTableType;
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickDestroyButton: () => void;
}): ReactElement => {
  const {
    destroyOrderDetail,
    setOrderDetailForDestroy,
    isDestroyed,
    setIsDestroyed,
    validationErrors,
    setValidationErrors,
  } = useDestroy();

  // useEffects
  /**
   * 初期化
   */
  useEffect((): void => {
    if (isOpen && prevOrderDetail) {
      setOrderDetailForDestroy(prevState => {
        return {
          id: prevOrderDetail.id,
        };
      });
      setValidationErrors(prevState => []);
      setIsDestroyed(prevState => false);
    }
  }, [ setOrderDetailForDestroy, setValidationErrors, setIsDestroyed, isOpen, prevOrderDetail ]);

  // use effects
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
          選択中の注文がなかった事になります。よろしいですか？
        </Paragraph>
      </div>
      <div className={commonClasses.mt_24}>
        <FormButton text={"削除する"} color={"red"} onClick={destroyOrderDetail} />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          注文管理へ戻る
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default OrderDeleteModal;
