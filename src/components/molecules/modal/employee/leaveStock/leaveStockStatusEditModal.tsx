"use client";

import { ReactElement, useEffect } from "react";
import H2 from "@/components/atoms/h2";
import SelectAndLabel from "@/components/molecules/selectAndLabel";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { EduITModal } from "@/components/molecules/eduITModal";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";
import { useIndex as useLeaveStockStatusIndex } from "@/hooks/enum/leaveStock/useIndex";
import { useUpdate } from "@/hooks/employee/leaveStock/leave/useUpdate";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import Error422 from "@/components/molecules/errors/error422";

const LeaveStockStatusEditModal = ({
  selectedLeaveStock,
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickUpdateButton,
}: {
  selectedLeaveStock: LeaveStockTableDbType;
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickUpdateButton: () => void;
}): ReactElement => {
  // customHooks
  const { getEnums: getLeaveStockStatuses, enums: leaveStockStatusOptions } = useLeaveStockStatusIndex();

  const {
    updateLeaveStock,
    validationErrors,
    setValidationErrors,
    isUpdated,
    setIsUpdated,
    leaveStockForUpdate,
    setLeaveStockForUpdate,
  } = useUpdate();

  // use effects

  /**
   * 初期化
   */
  useEffect((): void => {
    setValidationErrors(prevState => []);
    setIsUpdated(prevState => false);

    (async (): Promise<void> => {
      await getLeaveStockStatuses();
    })();

    setLeaveStockForUpdate(prevState => {
      return {
        id: selectedLeaveStock.id,
        leaveStockStatusOption: {
          value: selectedLeaveStock.status,
          label: selectedLeaveStock.statusLabel,
        },
      };
    });
  }, [
    setValidationErrors,
    setIsUpdated,
    getLeaveStockStatuses,
    setLeaveStockForUpdate,
    selectedLeaveStock.id,
    selectedLeaveStock.status,
    selectedLeaveStock.statusLabel,
  ]);

  /**
   * 更新状況の監視
   */
  useEffect((): void => {
    if (isOpen && isUpdated) {
      handleOnClickUpdateButton();
    }
  }, [ isOpen, isUpdated, handleOnClickUpdateButton ]);

  // handles
  /**
   * ステータス変更イベント
   * @param {ReactSelectOption} e
   */
  const handleOnChangeStatus = (e: ReactSelectOption): void => {
    setLeaveStockForUpdate(prevState => {
      return {
        ...prevState,
        leaveStockStatusOption: e,
      };
    });
  };

  return (
    <EduITModal isOpen={isOpen}>
      <H2>出荷編集</H2>
      <Error422 errors={validationErrors} />
      <SelectAndLabel
        id={"leaveStockStatus"}
        options={leaveStockStatusOptions}
        text={"ステータス"}
        value={leaveStockForUpdate.leaveStockStatusOption}
        changeFunction={handleOnChangeStatus}
      />
      <div className={commonClasses.mt_24}>
        <FormButton text={"編集する"} color={"green"} onClick={updateLeaveStock} />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          出荷依頼管理へ戻る
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default LeaveStockStatusEditModal;
