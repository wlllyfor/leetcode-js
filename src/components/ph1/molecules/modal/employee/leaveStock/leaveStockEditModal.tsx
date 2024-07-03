"use client";

import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import H2 from "@/components/atoms/h2";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import SelectAndLabel from "@/components/molecules/selectAndLabel";
import FormButton from "@/components/atoms/button/formButton";
import commonClasses from "@/styles/common/page.module.scss";
import Paragraph from "@/components/atoms/paragraph";
import InputOfRemark from "@/components/molecules/inputs/inputOfRemark";
import InputOfCommission from "@/components/molecules/inputs/inputOfCommission";
import InputOfPacking from "@/components/molecules/inputs/inputOfPacking";
import SmallButton from "@/components/atoms/button/smallButton";
import plus from "@/resource/img/plus.svg";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { EduITModal } from "@/components/molecules/eduITModal";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";
import { useIndex as useLeaveStockStatusIndex } from "@/hooks/enum/leaveStock/useIndex";
import { CommissionType, PackingType, useUpdate } from "@/hooks/employee/leaveStock/request/useUpdate";
import { UUID } from "@/lib/uuid";
import { LeaveStockPackDbTableType } from "@/types/db/leaveStock/leaveStockPack";
import { LeaveStockCommissionDbTableType } from "@/types/db/leaveStock/leaveStockCommission";
import { Integer } from "@/lib/integer";
import Error422 from "@/components/molecules/errors/error422";

const LeaveStockEditModal = ({
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

  // use states
  const [ commissionPriceTotal, setCommissionPriceTotal ] = useState<number>(0);
  const [ postageTotal, setPostageTotal ] = useState<number>(0);

  // use effects

  /**
   * 初期化
   */
  useEffect((): void => {
    setValidationErrors(prevState => []);
    setIsUpdated(prevState => false);

    getLeaveStockStatuses();

    const packages: PackingType[] =
      selectedLeaveStock.leaveStockPacks.length > 0
        ? selectedLeaveStock.leaveStockPacks.map((pack: LeaveStockPackDbTableType) => {
          return {
            uuid: UUID.generate(),
            weight: pack.weight,
            height: pack.height,
            width: pack.width,
            depth: pack.depth,
            boxesQuantity: pack.boxesQuantity,
            postage: pack.postage,
          };
        })
        : [
          {
            uuid: UUID.generate(),
            weight: 0,
            height: 0,
            width: 0,
            depth: 0,
            boxesQuantity: 1,
            postage: 0,
          },
        ];

    const commissions: CommissionType[] =
      selectedLeaveStock.leaveStockCommissions.length > 0
        ? selectedLeaveStock.leaveStockCommissions.map((commission: LeaveStockCommissionDbTableType) => {
          return {
            uuid: UUID.generate(),
            name: commission.name,
            price: commission.price,
            quantity: commission.quantity,
          };
        })
        : [
          {
            uuid: UUID.generate(),
            name: "",
            price: 0,
            quantity: 1,
          },
        ];
    setLeaveStockForUpdate(prevState => {
      return {
        id: selectedLeaveStock.id,
        trackingNo: selectedLeaveStock.trackingNo || "",
        packages: packages,
        leaveStockStatusOption: null,
        publicRemarks: selectedLeaveStock.publicRemarks || "",
        publicRemarksFile: null,
        privateRemarks: selectedLeaveStock.privateRemarks || "",
        privateRemarksFile: null,
        commissions: commissions,
      };
    });
  }, [ setValidationErrors, setIsUpdated, getLeaveStockStatuses, selectedLeaveStock, setLeaveStockForUpdate ]);

  /**
   * ステータス取得時の監視
   */
  useEffect((): void => {
    if (leaveStockStatusOptions.length > 0 && selectedLeaveStock.status) {
      const statusOption = leaveStockStatusOptions.find(option => option.value === selectedLeaveStock.status);
      setLeaveStockForUpdate(prevState => ({
        ...prevState,
        leaveStockStatusOption: statusOption || null,
      }));
    }
  }, [ leaveStockStatusOptions, selectedLeaveStock.status, setLeaveStockForUpdate ]);

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
    if (isOpen && leaveStockForUpdate.id && leaveStockForUpdate?.commissions.length > 0) {
      setCommissionPriceTotal(prevState => {
        return leaveStockForUpdate.commissions.reduce((total, commission) => {
          return total + commission.price * commission.quantity;
        }, 0);
      });
    }
  }, [ isOpen, leaveStockForUpdate.commissions, leaveStockForUpdate.id ]);

  /**
   * 送料合計計算
   */
  useEffect((): void => {
    if (isOpen && leaveStockForUpdate.id && leaveStockForUpdate?.packages.length > 0) {
      setPostageTotal(prevState => {
        return leaveStockForUpdate.packages.reduce((total, packing) => {
          return total + packing.postage * packing.boxesQuantity;
        }, 0);
      });
    }
  }, [ isOpen, leaveStockForUpdate.id, leaveStockForUpdate.packages ]);

  // handles

  /**
   * 追跡番号変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeTrackingNo = (e: ChangeEvent<HTMLInputElement>): void => {
    setLeaveStockForUpdate(prevState => {
      return {
        ...prevState,
        trackingNo: e.target.value,
      };
    });
  };

  /**
   * 梱包重量変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @param uuid
   */
  const handleOnChangePackageWeight = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setLeaveStockForUpdate(prevState => {
      const updatedPackages = prevState.packages.map((item: PackingType) => {
        if (item.uuid === uuid) {
          // UUIDが一致する要素を更新
          return {
            ...item,
            weight: Integer.parseIntExceptZero(e.target.value),
          };
        }
        return item;
      });
      return {
        ...prevState,
        packages: updatedPackages,
      };
    });
  };

  /**
   * 高さ変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @param uuid
   */
  const handleOnChangePackageHeight = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setLeaveStockForUpdate(prevState => {
      const updatedPackages = prevState.packages.map((item: PackingType) => {
        if (item.uuid === uuid) {
          // UUIDが一致する要素を更新
          return {
            ...item,
            height: Integer.parseIntExceptZero(e.target.value),
          };
        }
        return item;
      });
      return {
        ...prevState,
        packages: updatedPackages,
      };
    });
  };

  /**
   * 幅変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @param uuid
   */
  const handleOnChangePackageWidth = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setLeaveStockForUpdate(prevState => {
      const updatedPackages = prevState.packages.map((item: PackingType) => {
        if (item.uuid === uuid) {
          // UUIDが一致する要素を更新
          return {
            ...item,
            width: Integer.parseIntExceptZero(e.target.value),
          };
        }
        return item;
      });
      return {
        ...prevState,
        packages: updatedPackages,
      };
    });
  };

  /**
   * 奥行き変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @param uuid
   */
  const handleOnChangePackageDepth = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setLeaveStockForUpdate(prevState => {
      const updatedPackages = prevState.packages.map((item: PackingType) => {
        if (item.uuid === uuid) {
          // UUIDが一致する要素を更新
          return {
            ...item,
            depth: Integer.parseIntExceptZero(e.target.value),
          };
        }
        return item;
      });
      return {
        ...prevState,
        packages: updatedPackages,
      };
    });
  };

  /**
   * 梱包箱数変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @param uuid
   */
  const handleOnChangePackageBoxesQuantity = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setLeaveStockForUpdate(prevState => {
      const updatedPackages = prevState.packages.map((item: PackingType) => {
        if (item.uuid === uuid) {
          // UUIDが一致する要素を更新
          return {
            ...item,
            boxesQuantity: Integer.parseIntExceptZero(e.target.value),
          };
        }
        return item;
      });
      return {
        ...prevState,
        packages: updatedPackages,
      };
    });
  };

  /**
   * 送料単価変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @param uuid
   */
  const handleOnChangePackagePostage = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setLeaveStockForUpdate(prevState => {
      const updatedPackages = prevState.packages.map((item: PackingType) => {
        if (item.uuid === uuid) {
          // UUIDが一致する要素を更新
          return {
            ...item,
            postage: Integer.parseIntExceptZero(e.target.value),
          };
        }
        return item;
      });
      return {
        ...prevState,
        packages: updatedPackages,
      };
    });
  };

  /**
   * 梱包情報追加ボタン押下イベント
   */
  const handleOnClickAddPackagesButton = (): void => {
    setLeaveStockForUpdate(prevState => {
      const newOtherPrice: PackingType = {
        uuid: UUID.generate(),
        weight: 0,
        height: 0,
        width: 0,
        depth: 0,
        boxesQuantity: 0,
        postage: 0,
      };
      return {
        ...prevState,
        packages: [ ...prevState.packages, newOtherPrice ],
      };
    });
  };

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

  /**
   * 備考変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangePublicRemarks = (e: ChangeEvent<HTMLInputElement>): void => {
    setLeaveStockForUpdate(prevState => {
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
    setLeaveStockForUpdate(prevState => {
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
    setLeaveStockForUpdate(prevState => {
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
    setLeaveStockForUpdate(prevState => {
      if (!prevState) return prevState;

      return {
        ...prevState,
        privateRemarksFile: selectedFile,
      };
    });
  };

  /**
   * 手数料金額名称変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @param uuid
   */
  const handleOnChangeCommissionName = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setLeaveStockForUpdate(prevState => {
      const updatedCommissionPrices = prevState.commissions.map(item => {
        if (item.uuid === uuid) {
          // UUIDが一致する要素を更新
          return {
            ...item,
            name: e.target.value,
          };
        }
        return item;
      });
      return {
        ...prevState,
        commissions: updatedCommissionPrices,
      };
    });
  };

  /**
   * 手数料金額変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @param uuid
   */
  const handleOnChangeCommissionPrice = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setLeaveStockForUpdate(prevState => {
      const updatedOtherPrices = prevState.commissions.map(item => {
        if (item.uuid === uuid) {
          // UUIDが一致する要素を更新
          return {
            ...item,
            price: Integer.parseIntExceptZero(e.target.value),
          };
        }
        return item;
      });
      return {
        ...prevState,
        commissions: updatedOtherPrices,
      };
    });
  };

  /**
   * 手数料数量変更イベント
   * @param {React.ChangeEvent<HTMLInputElement>} e
   * @param uuid
   */
  const handleOnChangeCommissionQuantity = (e: ChangeEvent<HTMLInputElement>, uuid: string): void => {
    setLeaveStockForUpdate(prevState => {
      const updatedOtherPrices = prevState.commissions.map(item => {
        if (item.uuid === uuid) {
          // UUIDが一致する要素を更新
          return {
            ...item,
            quantity: Integer.parseIntExceptZero(e.target.value),
          };
        }
        return item;
      });
      return {
        ...prevState,
        commissions: updatedOtherPrices,
      };
    });
  };

  /**
   * 手数料金額追加ボタン押下イベント
   */
  const handleOnClickAddCommissionButton = (): void => {
    setLeaveStockForUpdate(prevState => {
      const newCommission: CommissionType = {
        uuid: UUID.generate(),
        price: 0,
        name: "",
        quantity: 0,
      };
      return {
        ...prevState,
        commissions: [ ...prevState.commissions, newCommission ],
      };
    });
  };

  return (
    <EduITModal isOpen={isOpen}>
      <H2>出荷依頼編集</H2>
      <Error422 errors={validationErrors} />
      <div className={`${commonClasses.flex__wrapper} ${commonClasses.flex_nowrap}`}>
        <InputAndLabel
          id={"trackingNo"}
          text={"追跡番号"}
          value={leaveStockForUpdate.trackingNo || ""}
          isRequired
          changeFunction={handleOnChangeTrackingNo}
        />
        <div className={commonClasses.ml_16} />
        <InputAndLabel
          id={"postageTotal"}
          text={"送料合計"}
          value={postageTotal.toLocaleString()}
          isRequired
          isReadOnly={true}
        />
      </div>
      <div className={commonClasses.mt_16}>
        {leaveStockForUpdate.packages &&
          leaveStockForUpdate.packages.map((pack: PackingType, index: number) => {
            return (
              <InputOfPacking
                key={pack.uuid}
                showLabel={index === 0}
                weightValue={pack.weight.toString()}
                weightChangeFunction={(e: ChangeEvent<HTMLInputElement>): void => {
                  handleOnChangePackageWeight(e, pack.uuid);
                }}
                heightValue={pack.height.toString()}
                heightChangeFunction={(e: ChangeEvent<HTMLInputElement>): void => {
                  handleOnChangePackageHeight(e, pack.uuid);
                }}
                widthValue={pack.width.toString()}
                widthChangeFunction={(e: ChangeEvent<HTMLInputElement>): void => {
                  handleOnChangePackageWidth(e, pack.uuid);
                }}
                depthValue={pack.depth.toString()}
                depthChangeFunction={(e: ChangeEvent<HTMLInputElement>): void => {
                  handleOnChangePackageDepth(e, pack.uuid);
                }}
                boxesQuantityValue={pack.boxesQuantity.toString()}
                boxesQuantityChangeFunction={(e: ChangeEvent<HTMLInputElement>): void => {
                  handleOnChangePackageBoxesQuantity(e, pack.uuid);
                }}
                postageValue={pack.postage.toString()}
                postageChangeFunction={(e: ChangeEvent<HTMLInputElement>): void => {
                  handleOnChangePackagePostage(e, pack.uuid);
                }}
              />
            );
          })}
      </div>
      <div className={`${commonClasses.flex__wrapper} ${commonClasses.mt_8}`}>
        <SmallButton text={"追加"} icon={plus} isBlue clickFunction={handleOnClickAddPackagesButton} />
      </div>
      <SelectAndLabel
        id={"status"}
        options={leaveStockStatusOptions}
        text={"ステータス"}
        changeFunction={handleOnChangeStatus}
        value={leaveStockForUpdate.leaveStockStatusOption}
      />
      <InputOfRemark
        id={"publicRemarks"}
        value={leaveStockForUpdate.publicRemarks || ""}
        text={"備考"}
        isRequired
        changeTextFunction={handleOnChangePublicRemarks}
        changeFileFunction={handleOnChangePublicRemarksFile}
        file={null}
      />
      <InputOfRemark
        id={"privateRemarks"}
        value={leaveStockForUpdate.privateRemarks || ""}
        text={"管理メモ"}
        isRequired
        changeTextFunction={handleOnChangePrivateRemarks}
        changeFileFunction={handleOnChangePrivateRemarksFile}
        file={null}
      />
      {leaveStockForUpdate.commissions &&
        leaveStockForUpdate.commissions.map((commission: CommissionType, index: number) => {
          return (
            <InputOfCommission
              key={commission.uuid}
              showLabel={index === 0}
              name={commission.name}
              nameChangeFunction={(e: ChangeEvent<HTMLInputElement>): void => {
                handleOnChangeCommissionName(e, commission.uuid);
              }}
              price={commission.price.toString()}
              priceChangeFunction={(e: ChangeEvent<HTMLInputElement>): void => {
                handleOnChangeCommissionPrice(e, commission.uuid);
              }}
              quantity={commission.quantity.toString()}
              quantityChangeFunction={(e: ChangeEvent<HTMLInputElement>): void => {
                handleOnChangeCommissionQuantity(e, commission.uuid);
              }}
              commissionTotal={commissionPriceTotal}
            />
          );
        })}

      <div className={`${commonClasses.flex__wrapper} ${commonClasses.mt_8}`}>
        <SmallButton text={"追加"} icon={plus} isBlue clickFunction={handleOnClickAddCommissionButton} />
      </div>
      <div className={commonClasses.mt_24}>
        <FormButton text={"編集する"} color={"green"} onClick={updateLeaveStock} />
        <Paragraph isLink isCenter isMarginTop clickFunction={handleOnCloseButtonClick}>
          出荷依頼管理へ戻る
        </Paragraph>
      </div>
    </EduITModal>
  );
};

export default LeaveStockEditModal;
