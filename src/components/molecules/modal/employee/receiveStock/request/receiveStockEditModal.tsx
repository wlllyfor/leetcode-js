"use client";

import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import H2 from "@/components/atoms/h2";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import SelectAndLabel from "@/components/molecules/selectAndLabel";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import InputOfRemark from "@/components/molecules/inputs/inputOfRemark";
import SmallButton from "@/components/atoms/button/smallButton";
import plus from "@/resource/img/plus.svg";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { useIndex as useReceiveStockStatusIndex } from "@/hooks/enum/receiveStock/useIndex";
import { CommissionDetailType, useUpdate } from "@/hooks/employee/receiveStock/request/useUpdate";
import { UUID } from "@/lib/uuid";
import InputOtherPrices from "@/components/molecules/inputs/inputOtherPrices";
import Error422 from "@/components/molecules/errors/error422";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { OtherPriceType } from "@/hooks/employee/orderDetail/useUpdate";
import { EduITModal } from "@/components/molecules/eduITModal";
import { Integer } from "@/lib/integer";

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
  const { getEnums: getReceiveStockStatuses, enums: receiveStockStatusOptions } = useReceiveStockStatusIndex();

  const {
    updateReceiveStock,
    validationErrors,
    setValidationErrors,
    isUpdated,
    setIsUpdated,
    receiveStockForUpdate,
    setReceiveStockForUpdate,
  } = useUpdate();

  // use states
  const [ commissionPriceTotal, setCommissionPriceTotal ] = useState<number>(0);

  // use effects

  /**
   * 初期化
   */
  useEffect((): void => {
    setValidationErrors(prevState => []);
    setIsUpdated(prevState => false);

    getReceiveStockStatuses();

    const commissionDetails: CommissionDetailType[] =
      prevReceiveStock.receiveStockCommissions.length > 0
        ? prevReceiveStock.receiveStockCommissions.map(commission => {
          return {
            uuid: UUID.generate(),
            name: commission.name,
            price: commission.price,
          };
        })
        : [
          {
            uuid: UUID.generate(),
            name: "",
            price: 0,
          },
        ];
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
        commissionDetails: commissionDetails,
      };
    });
  }, [
    setValidationErrors,
    setIsUpdated,
    getReceiveStockStatuses,
    prevReceiveStock.receiveStockCommissions,
    prevReceiveStock.id,
    prevReceiveStock.customerId,
    prevReceiveStock.trackingNo,
    prevReceiveStock.expectedArrivedOn,
    prevReceiveStock.publicRemarks,
    prevReceiveStock.privateRemarks,
    setReceiveStockForUpdate,
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
  }, [ isOpen, isUpdated, handleOnClickUpdateButton ]);

  /**
   * 手数料合計計算
   */
  useEffect((): void => {
    if (isOpen && receiveStockForUpdate.id && receiveStockForUpdate?.commissionDetails.length > 0) {
      setCommissionPriceTotal(prevState => {
        return receiveStockForUpdate.commissionDetails.reduce((total, commission) => {
          return total + commission.price;
        }, 0);
      });
    }
  }, [ isOpen, receiveStockForUpdate.commissionDetails, receiveStockForUpdate.id ]);

  // handles

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

  /**
   * その他金額名称変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @param uuid
   */
  const handleOnChangeOtherPricesName = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setReceiveStockForUpdate(prevState => {
      const updatedCommissionPrices = prevState.commissionDetails.map(item => {
        if (item.uuid === uuid) {
          // UUIDが一致する要素を更新
          return {
            ...item,
            name: e.target.value,
          };
        }
        return item; // UUIDが一致しない場合はそのままの要素を返す
      });
      return {
        ...prevState,
        commissionDetails: updatedCommissionPrices,
      };
    });
  };

  /**
   * その他金額変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @param uuid
   */
  const handleOnChangeOtherPricesPrice = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setReceiveStockForUpdate(prevState => {
      const updatedOtherPrices = prevState.commissionDetails.map(item => {
        if (item.uuid === uuid) {
          // UUIDが一致する要素を更新
          return {
            ...item,
            price: Integer.parseIntExceptZero(e.target.value),
          };
        }
        return item; // UUIDが一致しない場合はそのままの要素を返す
      });
      return {
        ...prevState,
        commissionDetails: updatedOtherPrices,
      };
    });
  };

  /**
   * その他金額追加ボタン押下イベント
   */
  const handleOnClickAddOtherPriceButton = (): void => {
    setReceiveStockForUpdate(prevState => {
      const newOtherPrice: OtherPriceType = {
        uuid: UUID.generate(),
        price: 0,
        name: "",
      };
      return {
        ...prevState,
        commissionDetails: [ ...prevState.commissionDetails, newOtherPrice ],
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
      {receiveStockForUpdate?.commissionDetails.map((otherPrice, index) => {
        return (
          <InputOtherPrices
            isTop={index === 0}
            otherPriceTotal={commissionPriceTotal}
            key={otherPrice.uuid}
            otherPrice={otherPrice}
            handleOnChangeOtherPricesName={handleOnChangeOtherPricesName}
            handleOnChangeOtherPricesPrice={handleOnChangeOtherPricesPrice}
          />
        );
      })}
      <div className={`${commonClasses.flex__wrapper} ${commonClasses.mt_8}`}>
        <SmallButton text={"追加"} icon={plus} isBlue clickFunction={handleOnClickAddOtherPriceButton} />
      </div>
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
