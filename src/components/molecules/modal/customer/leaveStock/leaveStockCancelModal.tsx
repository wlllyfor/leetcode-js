"use client";

import H2 from "@/components/atoms/h2";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { ReactElement, useEffect } from "react";
import { EduITModal } from "@/components/molecules/eduITModal";
import Loading from "@/components/molecules/common/loading";
import { useCancel } from "@/hooks/customer/leaveStock/useCancel";
import Error422 from "@/components/molecules/errors/error422";

const LeaveStockCancelModal = ({
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
  const { postCancel, isCanceled, setIsCanceled, validationErrors, setValidationErrors, setSrcIdList } = useCancel();

  /**
   * 初期化
   */
  useEffect((): void => {
    if (isOpen) {
      setSrcIdList(prevState => checkedIdList);
    }
  }, [ checkedIdList, isOpen, setSrcIdList ]);

  /**
   * キャンセル後の処理
   */
  useEffect((): void => {
    if (isOpen && isCanceled) {
      handleOnClickCancelButton();
    }
  }, [ isOpen, isCanceled, handleOnClickCancelButton ]);

  // useEffects

  /**
   * 初期化
   */
  useEffect((): void => {
    if (isOpen) {
      setValidationErrors(prevState => []);
      setIsCanceled(prevState => false);
    }
  }, [ isOpen, setValidationErrors, setIsCanceled, setSrcIdList ]);

  // loading condition
  if (isOpen && !setSrcIdList) {
    return <Loading />;
  }

  return (
    <EduITModal isOpen={isOpen}>
      <Error422 errors={validationErrors} />
      <H2>キャンセルの際の注意事項</H2>
      <div className={commonClasses.mt_16}>
        <Paragraph isLeft>
          キャンセルが完了しますと、出荷履歴から自動的に削除されます。問題ないか確認のうえ、キャンセルをする場合は以下のボタンを押してください。
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

export default LeaveStockCancelModal;
