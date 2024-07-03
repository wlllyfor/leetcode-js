"use client";

import { ChangeEvent, ReactElement, useEffect } from "react";
import H2 from "@/components/atoms/h2";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import SelectAndLabel from "@/components/molecules/selectAndLabel";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import InputOfRemark from "@/components/molecules/inputs/inputOfRemark";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { useIndex as useReceiveStockIndex } from "@/hooks/enum/receiveStock/useIndex";
import { EduITModal } from "@/components/molecules/eduITModal";
import { useUpdate } from "@/hooks/employee/receiveStock/receive/useUpdate";
import Error422 from "@/components/molecules/errors/error422";

const ReceiveStockEditModal = ({
  prevReceiveStock,
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickUpdateButton,
}: {
  prevReceiveStock: ReceiveStockDbTableType;
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickUpdateButton: () => void;
}): ReactElement => {
  // customHooks
  const { getEnums: getReceiveStockStatuses, enums: receiveStockStatusOptions } = useReceiveStockIndex();

  const {
    updateReceiveStock,
    validationErrors,
    setValidationErrors,
    isUpdated,
    setIsUpdated,
    receiveStockForUpdate,
    setReceiveStockForUpdate,
  } = useUpdate();

  // use effects

  /**
   * 初期化
   */
  useEffect((): void => {
    setValidationErrors(prevState => []);
    setIsUpdated(prevState => false);

    getReceiveStockStatuses();

    setReceiveStockForUpdate(prevState => {
      return {
        id: prevReceiveStock.id,
        customerId: prevReceiveStock.customerId,
        trackingNo: prevReceiveStock.trackingNo || "",
        expectedArrivedOn: prevReceiveStock.expectedArrivedOn || "",
        statusOption: null,
        publicRemarks: prevReceiveStock.publicRemarks || "",
        publicRemarksFile: null,
        privateRemarks: prevReceiveStock.privateRemarks || "",
        privateRemarksFile: null,
      };
    });
  }, [
    setValidationErrors,
    setIsUpdated,
    getReceiveStockStatuses,
    setReceiveStockForUpdate,
    prevReceiveStock.id,
    prevReceiveStock.customerId,
    prevReceiveStock.trackingNo,
    prevReceiveStock.expectedArrivedOn,
    prevReceiveStock.publicRemarks,
    prevReceiveStock.privateRemarks,
  ]);

  /**
   * ステータス取得時の監視
   */
  useEffect((): void => {
    if (receiveStockStatusOptions.length > 0) {
      const statusOption = receiveStockStatusOptions.find(option => option.value === prevReceiveStock.status);
      setReceiveStockForUpdate(prevState => ({
        ...prevState,
        statusOption: statusOption || null,
      }));
    }
  }, [ receiveStockStatusOptions, prevReceiveStock, setReceiveStockForUpdate ]);

  /**
   * 更新状況の監視
   */
  useEffect((): void => {
    if (isOpen && isUpdated) {
      handleOnClickUpdateButton();
    }
  }, [ isOpen, isUpdated, handleOnClickUpdateButton ]); // handles

  /**
   * 追跡番号変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeTrackingNo = (e: ChangeEvent<HTMLInputElement>): void => {
    setReceiveStockForUpdate(prevState => {
      return {
        ...prevState,
        trackingNo: e.target.value,
      };
    });
  };

  /**
   * ステータス変更イベント
   * @param {ReactSelectOption} e
   */
  const handleOnChangeStatus = (e: ReactSelectOption): void => {
    setReceiveStockForUpdate(prevState => {
      return {
        ...prevState,
        statusOption: e,
      };
    });
  };

  /**
   * 入荷予定日変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeExpectedArrivedOn = (e: ChangeEvent<HTMLInputElement>): void => {
    setReceiveStockForUpdate(prevState => {
      return {
        ...prevState,
        expectedArrivedOn: e.target.value,
      };
    });
  };

  /**
   * 備考変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangePublicRemarks = (e: ChangeEvent<HTMLInputElement>): void => {
    setReceiveStockForUpdate(prevState => {
      return {
        ...prevState,
        publicRemarks: e.target.value,
      };
    });
  };

  /**
   * 備考添付ファイル変更イベント
   * @param e
   */
  const handleOnChangePublicRemarksFile = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const selectedFile = e.target.files?.[0] ?? null;
    setReceiveStockForUpdate(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        publicRemarksFile: selectedFile,
      };
    });
  };

  /**
   * 管理メモ変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangePrivateRemarks = (e: ChangeEvent<HTMLInputElement>): void => {
    setReceiveStockForUpdate(prevState => {
      return {
        ...prevState,
        privateRemarks: e.target.value,
      };
    });
  };

  /**
   * 管理メモ添付ファイル変更イベント
   * @param e
   */
  const handleOnChangePrivateRemarksFile = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const selectedFile = e.target.files?.[0] ?? null;
    setReceiveStockForUpdate(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        privateRemarksFile: selectedFile,
      };
    });
  };

  return (
    <EduITModal isOpen={isOpen}>
      <H2>入荷依頼編集</H2>
      <Error422 errors={validationErrors} />
      <InputAndLabel
        id={"trackingNo"}
        text={"追跡番号"}
        value={receiveStockForUpdate.trackingNo || ""}
        isRequired
        changeFunction={handleOnChangeTrackingNo}
      />
      <InputAndLabel
        id={"expectedArrivedOn"}
        inputType={"date"}
        text={"入荷予定日"}
        value={receiveStockForUpdate.expectedArrivedOn || ""}
        changeFunction={handleOnChangeExpectedArrivedOn}
      />
      <SelectAndLabel
        id={"status"}
        options={receiveStockStatusOptions}
        text={"ステータス"}
        value={receiveStockForUpdate.statusOption}
        changeFunction={handleOnChangeStatus}
      />
      <InputOfRemark
        id={"publicRemarks"}
        value={receiveStockForUpdate.publicRemarks || ""}
        text={"備考"}
        isRequired
        changeTextFunction={handleOnChangePublicRemarks}
        changeFileFunction={handleOnChangePublicRemarksFile}
      />
      <InputOfRemark
        id={"privateRemarks"}
        value={receiveStockForUpdate.privateRemarks || ""}
        text={"管理メモ"}
        isRequired
        changeTextFunction={handleOnChangePrivateRemarks}
        changeFileFunction={handleOnChangePrivateRemarksFile}
      />
      <div className={commonClasses.mt_24}>
        <FormButton text={"編集する"} color={"green"} onClick={updateReceiveStock} />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          入荷依頼管理へ戻る
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default ReceiveStockEditModal;
