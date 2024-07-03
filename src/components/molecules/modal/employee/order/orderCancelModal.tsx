"use client";

import H2 from "@/components/atoms/h2";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { ReactElement, useEffect } from "react";
import { EduITModal } from "@/components/molecules/eduITModal";
import { useCancel } from "@/hooks/employee/orderDetail/useCancel";
import { enumOrderStatus } from "@/types/enum/enumOrderStatus";
import Error422 from "@/components/molecules/errors/error422";

const OrderCancelModal = ({
  checkedIdList,
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickCancelButton,
}: {
  checkedIdList: number[];
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickCancelButton: () => void;
}): ReactElement => {
  const {
    cancelOrderDetail,
    validationErrors,
    setValidationErrors,
    isCanceled,
    setIsCanceled,
    setOrderDetailForCancel,
  } = useCancel();

  // useEffects
  /**
   * 初期化
   */
  useEffect((): void => {
    if (isOpen && checkedIdList) {
      setOrderDetailForCancel(prevState => {
        return {
          checkedIdList: checkedIdList,
          orderStatus: enumOrderStatus.canceled,
        };
      });
      setValidationErrors(prevState => []);
      setIsCanceled(prevState => false);
    }
  }, [ setOrderDetailForCancel, setValidationErrors, setIsCanceled, isOpen, checkedIdList ]);

  // use effects
  useEffect((): void => {
    if (isOpen && isCanceled) {
      handleOnClickCancelButton();
    }
  }, [ isOpen, isCanceled, handleOnClickCancelButton ]);

  return (
    <EduITModal isOpen={isOpen}>
      <H2>キャンセル処理</H2>
      <Error422 errors={validationErrors} />
      <div className={commonClasses.mt_16}>
        <Paragraph isSmall isLeft>
          選択中の注文がなかった事になります。よろしいですか？
        </Paragraph>
      </div>
      <div className={commonClasses.mt_24}>
        <FormButton text={"キャンセルする"} color={"red"} onClick={cancelOrderDetail} />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          注文管理へ戻る
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default OrderCancelModal;
