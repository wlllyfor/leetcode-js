"use client";

import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import H2 from "@/components/atoms/h2";
import H3 from "@/components/atoms/h3";
import SelectAndLabel from "@/components/molecules/selectAndLabel";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import RadioButton from "@/components/molecules/inputs/radioButton";
import Span from "@/components/atoms/span";
import LeaveStockEditModal from "@/components/molecules/modal/employee/leaveStock/leaveStockEditModal";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import AuthenticatedLayout from "@/components/molecules/layouts/employee/authenticatedLayout";
import { useIndex as useLeaveStockStatusIndex } from "@/hooks/enum/leaveStock/useIndex";
import { useIndex as useHubIndex } from "@/hooks/common/hub/useIndex";
import { useIndex as useGroupIndex } from "@/hooks/common/group/useIndex";
import { useModal } from "@/hooks/useModal";
import { useFind } from "@/hooks/employee/orderDetail/useFind";
import { useIndex } from "@/hooks/employee/leaveStock/useIndex";
import LeaveStockCreateModal from "@/components/molecules/modal/employee/leaveStock/leaveStockCreateModal";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";
import LeaveStockItem from "@/components/molecules/listItem/employee/leaveStock/leaveStockItem";
import { UUID } from "@/lib/uuid";
import { Integer } from "@/lib/integer";

const Template = ({ srcOrderDetailId }: { srcOrderDetailId: number | null; }): ReactElement => {
  // customHooks
  const { leaveStocks, getLeaveStocks, condition, setCondition } = useIndex();

  const { getEnums: getLeaveStockStatuses, enums: leaveStockStatusOptions } = useLeaveStockStatusIndex();

  const { getHubs, options: hubOptions } = useHubIndex();

  const {
    getGroups,
    options: groupOptions,
    setCondition: setGroupIndexCondition,
    condition: groupIndexCondition,
  } = useGroupIndex();

  // 作成用モーダル変数
  const {
    isOpen: isCreateModalOpen,
    setIsOpen: setIsCreateModalOpen,
    handleOnCloseButtonClick: handleOnCreateModalCloseButtonClick,
  } = useModal();

  // 更新用モーダル変数
  const {
    isOpen: isEditModalOpen,
    setIsOpen: setIsEditModalOpen,
    handleOnCloseButtonClick: handleOnEditModalCloseButtonClick,
  } = useModal();

  const { orderDetail: srcOrderDetail, getOrderDetail } = useFind();

  // useStatuses
  const [ selectedLeaveStock, setSelectedLeaveStock ] = useState<LeaveStockTableDbType | null>(null);

  /**
   * 画面描画時に、注文明細パラメータがある場合、該当データを取得。
   */
  useEffect((): void => {
    if (srcOrderDetailId) {
      (async (): Promise<void> => {
        await getOrderDetail(srcOrderDetailId);
      })();
    }
  }, [ getOrderDetail, srcOrderDetailId ]);

  /**
   * 画面初期化
   */
  useEffect((): void => {
    setIsCreateModalOpen(prevState => {
      return srcOrderDetailId !== null;
    });

    setIsEditModalOpen(prevState => false);

    (async (): Promise<void> => {
      // 班の取得は拠点選択時のみ

      await getHubs();
      getLeaveStockStatuses();
    })();
  }, [ setIsCreateModalOpen, setIsEditModalOpen, getHubs, getLeaveStockStatuses, srcOrderDetailId ]);

  /**
   * 拠点が変更されたら、班の検索条件を変更
   */
  useEffect((): void => {
    if (condition.hubOptions) {
      const values = condition.hubOptions.map(option => Integer.parseIntExceptZero(option.value));

      setGroupIndexCondition(prevState => {
        return {
          ...prevState,
          hubIdList: values,
        };
      });
    }
  }, [ condition, setGroupIndexCondition ]);

  /**
   * モーダルがすべて閉じたとき（初期化も含む）
   */
  useEffect((): void => {
    if (!isCreateModalOpen && !isEditModalOpen && !condition.isUnLeaved) {
      (async (): Promise<void> => {
        await getLeaveStocks();
      })();
    }
  }, [ isCreateModalOpen, isEditModalOpen, condition, getLeaveStocks ]);

  /**
   * 拠点の検索条件が変更されたら検索を行う。
   */
  useEffect((): void => {
    if (groupIndexCondition.hubIdList && groupIndexCondition.hubIdList.length > 0) {
      (async (): Promise<void> => {
        await getGroups();
      })();
    }
  }, [ getGroups, groupIndexCondition.hubIdList ]);

  // handles

  /**
   * ステータス変更イベント
   * @param {ReactSelectOption[]} e
   */
  const handleOnChangeReceiveStockStatus = (e: ReactSelectOption[]): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        leaveStockStatusOptions: e,
      };
    });
  };

  /**
   * 拠点変更イベント
   * @param {ReactSelectOption[]} e
   */
  const handleOnChangeHub = (e: ReactSelectOption[]): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        hubOptions: e,
      };
    });
  };

  /**
   * 班変更イベント
   * @param {ReactSelectOption[]} e
   */
  const handleOnChangeGroup = (e: ReactSelectOption[]): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        groupOptions: e,
      };
    });
  };

  /**
   * 出荷コード変更イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeLeaveStockCode = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        leaveStockCode: e.target.value,
      };
    });
  };

  /**
   * 出荷種別（国内出荷）選択イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  const handleOnSelectDomesticLeave = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        isDomestic: e.target.checked,
      };
    });
  };

  /**
   * 出荷種別（国際出荷）選択イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  const handleOnSelectInternationalLeave = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        isDomestic: !e.target.checked,
      };
    });
  };

  /**
   * 出荷作業開始日変更イベント
   * @param {ReactSelectOption} e
   */
  const handleOnChangeLeaveStartedOnFrom = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        leaveStartedOnFrom: e.target.value,
      };
    });
  };

  /**
   * 出荷作業終了日変更イベント
   * @param {ReactSelectOption} e
   */
  const handleOnChangeLeaveStartedOnTo = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        leaveStartedOnTo: e.target.value,
      };
    });
  };

  /**
   * 出荷完了開始日変更イベント
   * @param {ReactSelectOption} e
   */
  const handleOnChangeLeavedOnFrom = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        leavedOnFrom: e.target.value,
      };
    });
  };

  /**
   * 出荷完了終了日変更イベント
   * @param {ReactSelectOption} e
   */
  const handleOnChangeLeavedOnTo = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        leavedOnTo: e.target.value,
      };
    });
  };

  /**
   * 追跡番号変更イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeTrackingNo = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        trackingNo: e.target.value,
      };
    });
  };

  /**
   * 注文番号変更イベント
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeOrderCode = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        orderCode: e.target.value,
      };
    });
  };

  /**
   * 修正モーダルオープンイベント
   */
  const handleOnClickOpenEditModal = (): void => {
    setIsEditModalOpen(prevState => true);
  };

  /**
   * 作成ボタン押下イベント
   * 処理はモーダルで行う
   */
  const handleOnClickStoreButton = (): void => {
    setIsCreateModalOpen(prevState => false);
  };

  /**
   * 編集ボタン押下イベント
   * 処理はモーダルで行う
   */
  const handleOnClickUpdateButton = (): void => {
    setIsEditModalOpen(prevState => false);
  };

  return (
    <AuthenticatedLayout>
      <div>
        <H2 isPageTop> </H2>
        <WhiteWideWrapper>
          <H3>絞り込み検索</H3>
          <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_end} ${commonClasses.justify_between}`}>
            <div className={`${commonClasses.flex__wrapper} ${commonClasses.column}`}>
              <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.c_mr_16}`}>
                <SelectAndLabel
                  id={"leaveStockStatus"}
                  options={leaveStockStatusOptions}
                  text={"ステータス"}
                  isMulti
                  isTopItem
                  changeMultiItemFunction={handleOnChangeReceiveStockStatus}
                />
                <SelectAndLabel
                  id={"hub"}
                  options={hubOptions}
                  text={"拠点"}
                  isMulti
                  isTopItem
                  changeMultiItemFunction={handleOnChangeHub}
                />
                <SelectAndLabel
                  id={"group"}
                  options={groupOptions}
                  text={"班"}
                  isMulti
                  isTopItem
                  changeMultiItemFunction={handleOnChangeGroup}
                />
              </div>
              <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_end} ${commonClasses.c_mr_16}`}>
                <InputAndLabel
                  id={""}
                  text={"追跡番号"}
                  value={condition.trackingNo || ""}
                  changeFunction={handleOnChangeTrackingNo}
                />
                <InputAndLabel
                  id={""}
                  text={"注文番号"}
                  value={condition.orderCode || ""}
                  changeFunction={handleOnChangeOrderCode}
                />
                <InputAndLabel
                  id={""}
                  text={"出荷ID"}
                  value={condition.leaveStockCode || ""}
                  changeFunction={handleOnChangeLeaveStockCode}
                />
                <RadioButton
                  id={"leaveTypeOfDomestic"}
                  text={"国内出荷"}
                  value={"domestic"}
                  name={"leaveType"}
                  changeFunction={handleOnSelectDomesticLeave}
                />
                <RadioButton
                  id={"leaveTypeOfInterNational"}
                  text={"国際出荷"}
                  value={"interNational"}
                  name={"leaveType"}
                  changeFunction={handleOnSelectInternationalLeave}
                />
                <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_end}`}>
                  <InputAndLabel
                    id={"leaveStartedOnFrom"}
                    text={"出荷作業開始日"}
                    value={condition.leaveStartedOnFrom || ""}
                    isSmall
                    inputType={"date"}
                    changeFunction={handleOnChangeLeaveStartedOnFrom}
                  />
                  <div className={`${commonClasses.ml_10} ${commonClasses.mr_10}`}>
                    <Span>～</Span>
                  </div>
                  <InputAndLabel
                    id={"leaveStartedOnTo"}
                    text={" "}
                    value={condition.leaveStartedOnTo || ""}
                    isSmall
                    inputType={"date"}
                    changeFunction={handleOnChangeLeaveStartedOnTo}
                  />
                </div>
                <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_end}`}>
                  <InputAndLabel
                    id={"leavedOnFrom"}
                    text={"出荷完了日"}
                    value={condition.leavedOnFrom || ""}
                    isSmall
                    inputType={"date"}
                    changeFunction={handleOnChangeLeavedOnFrom}
                  />
                  <div className={`${commonClasses.ml_10} ${commonClasses.mr_10}`}>
                    <Span>～</Span>
                  </div>
                  <InputAndLabel
                    id={"leavedOnTo"}
                    text={" "}
                    value={condition.leavedOnTo || ""}
                    isSmall
                    inputType={"date"}
                    changeFunction={handleOnChangeLeavedOnTo}
                  />
                </div>
              </div>
            </div>
          </div>
        </WhiteWideWrapper>
        {leaveStocks &&
          leaveStocks.map((leaveStock: LeaveStockTableDbType) => {
            return (
              <LeaveStockItem
                key={UUID.generate()}
                leaveStock={leaveStock}
                setSelectedLeaveStock={setSelectedLeaveStock}
                handleOnClickOpenEditModal={handleOnClickOpenEditModal}
              />
            );
          })}
      </div>
      {/* 以下モーダル */}
      {isCreateModalOpen && srcOrderDetail && (
        <LeaveStockCreateModal
          handleOnClickStoreButton={handleOnClickStoreButton}
          srcOrderDetail={srcOrderDetail}
          handleOnCloseButtonClick={handleOnCreateModalCloseButtonClick}
          isOpen={isCreateModalOpen}
        />
      )}
      {isEditModalOpen && selectedLeaveStock && (
        <LeaveStockEditModal
          selectedLeaveStock={selectedLeaveStock}
          isOpen={isEditModalOpen}
          handleOnClickUpdateButton={handleOnClickUpdateButton}
          handleOnCloseButtonClick={handleOnEditModalCloseButtonClick}
        />
      )}
    </AuthenticatedLayout>
  );
};

export default Template;
