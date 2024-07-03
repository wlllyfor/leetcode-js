"use client";

import H2 from "@/components/atoms/h2";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import { ChangeEvent, ReactElement, useEffect } from "react";
import { EduITModal } from "@/components/molecules/eduITModal";
import { useBulkUpdate } from "@/hooks/employee/orderDetail/useBulkUpdate";
import { useIndex as useOrderStatuses } from "@/hooks/enum/orderStatuses/useIndex";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import Error422 from "@/components/molecules/errors/error422";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import SelectAndLabel from "@/components/molecules/selectAndLabel";
import InputOfRemark from "@/components/molecules/inputs/inputOfRemark";

const OrderUpdateBulkModal = ({
  checkedIdList,
  isOpen,
  handleOnCloseButtonClick,
  handleOnClickBulkUpdateButton,
}: {
  checkedIdList: number[];
  isOpen: boolean;
  handleOnCloseButtonClick: () => void;
  handleOnClickBulkUpdateButton: () => void;
}): ReactElement => {
  // custom hooks
  const { getEnums: getOrderStatuses, enums: orderStatusOptions } = useOrderStatuses();

  const {
    putOrderDetail,
    validationErrors,
    setValidationErrors,
    isUpdated,
    setIsUpdated,
    orderDetailForUpdate,
    setOrderDetailForUpdate,
  } = useBulkUpdate();

  // useEffects
  /**
   * 初期化
   */
  useEffect((): void => {
    if (isOpen && checkedIdList) {
      setOrderDetailForUpdate(prevState => {
        return {
          checkedIdList: checkedIdList,
          trackingNo: "",
          privateRemarks: "",
          privateRemarksFile: null,
          publicRemarks: "",
          publicRemarksFile: null,
          statusOption: null,
        };
      });
      setValidationErrors(prevState => []);
      setIsUpdated(prevState => false);
      (async (): Promise<void> => {
        getOrderStatuses("employee");
      })();
    }
  }, [ setOrderDetailForUpdate, setValidationErrors, setIsUpdated, getOrderStatuses, isOpen, checkedIdList ]);

  // use effects
  useEffect((): void => {
    if (isOpen && isUpdated) {
      handleOnClickBulkUpdateButton();
    }
  }, [ isOpen, isUpdated, handleOnClickBulkUpdateButton ]);

  // handles

  /**
   * 追跡番号変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeTrackingNo = (e: ChangeEvent<HTMLInputElement>): void => {
    setOrderDetailForUpdate(prevState => {
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
    setOrderDetailForUpdate(prevState => {
      return {
        ...prevState,
        statusOption: e,
      };
    });
  };

  /**
   * 備考変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangePublicRemarks = (e: ChangeEvent<HTMLInputElement>): void => {
    setOrderDetailForUpdate(prevState => {
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
    setOrderDetailForUpdate(prevState => {
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
    setOrderDetailForUpdate(prevState => {
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
    setOrderDetailForUpdate(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        privateRemarksFile: selectedFile,
      };
    });
  };

  return (
    <EduITModal isOpen={isOpen}>
      <H2>一括注文処理</H2>
      <Error422 errors={validationErrors} />
      <div className={`${commonClasses.flex__wrapper} ${commonClasses.flex_nowrap}`}>
        <InputAndLabel
          id={"trackingNo"}
          text={"追跡入荷情報"}
          value={orderDetailForUpdate.trackingNo || ""}
          isRequired
          changeFunction={handleOnChangeTrackingNo}
        />
        <div className={commonClasses.ml_16} />
        <SelectAndLabel
          id={"status"}
          options={orderStatusOptions}
          text={"ステータス"}
          isRequired
          isSmall
          changeFunction={handleOnChangeStatus}
        />
      </div>
      <InputOfRemark
        id={"publicRemarks"}
        text={"備考"}
        value={orderDetailForUpdate.publicRemarks}
        file={null}
        changeTextFunction={handleOnChangePublicRemarks}
        changeFileFunction={handleOnChangePublicRemarksFile}
      />
      <InputOfRemark
        id={"privateRemarks"}
        text={"管理メモ"}
        value={orderDetailForUpdate.privateRemarks}
        isRequired
        file={null}
        changeTextFunction={handleOnChangePrivateRemarks}
        changeFileFunction={handleOnChangePrivateRemarksFile}
      />
      <div className={commonClasses.mt_24}>
        <FormButton text={"注文処理完了"} color={"green"} onClick={putOrderDetail} />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          注文管理へ戻る
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default OrderUpdateBulkModal;
