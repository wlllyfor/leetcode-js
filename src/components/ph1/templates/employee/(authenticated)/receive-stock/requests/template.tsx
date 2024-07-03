"use client";

import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import H2 from "@/components/atoms/h2";
import H3 from "@/components/atoms/h3";
import ReceiveStockItem from "@/components/molecules/listItem/employee/receiveStock/receiveStockItem";
import ReceiveStockEditModal from "@/components/molecules/modal/employee/receiveStock/request/receiveStockEditModal";
import SelectAndLabel from "@/components/molecules/selectAndLabel";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import Span from "@/components/atoms/span";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import AuthenticatedLayout from "@/components/molecules/layouts/employee/authenticatedLayout";
import { useIndex } from "@/hooks/employee/receiveStock/useIndex";
import { useIndex as useHubIndex } from "@/hooks/common/hub/useIndex";
import { useIndex as useEmployeeIndex } from "@/hooks/common/employee/useIndex";
import { useIndex as useGroupIndex } from "@/hooks/common/group/useIndex";
import { useModal } from "@/hooks/useModal";
import { useIndex as useReceiveStockIndex } from "@/hooks/enum/receiveStock/useIndex";
import { UUID } from "@/lib/uuid";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { useFind } from "@/hooks/employee/orderDetail/useFind";
import ReceiveStockCreateModal from "@/components/molecules/modal/employee/receiveStock/request/receiveStockCreateModal";
import { Integer } from "@/lib/integer";

const Template = ({ srcOrderDetailId }: { srcOrderDetailId: number | null; }): ReactElement => {
  // customHooks
  const { condition, setCondition, getReceiveStocks, receiveStocks } = useIndex();

  const { getEnums: getReceiveStockStatuses, enums: receiveStockStatusOptions } = useReceiveStockIndex();

  const { getHubs, options: hubOptions } = useHubIndex();
  const { getEmployees, options: employeeOptions } = useEmployeeIndex();
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

  // useStatuses
  const [ selectedReceiveStock, setSelectedReceiveStock ] = useState<ReceiveStockDbTableType | null>(null);

  const { orderDetail: srcOrderDetail, getOrderDetail } = useFind();

  // useEffects

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
      await getEmployees();
      getReceiveStockStatuses();
    })();
  }, [ setIsCreateModalOpen, setIsEditModalOpen, getHubs, getEmployees, getReceiveStockStatuses, srcOrderDetailId ]);

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
    if (!isCreateModalOpen && !isEditModalOpen && !condition.isUnreceived) {
      (async (): Promise<void> => {
        await getReceiveStocks();
      })();
    }
  }, [ isCreateModalOpen, isEditModalOpen, condition, getReceiveStocks ]);

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
        receiveStockStatusOptions: e,
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
   * スタッフ変更イベント
   * @param {ReactSelectOption[]} e
   */
  const handleOnChangeEmployee = (e: ReactSelectOption[]): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        employeeOptions: e,
      };
    });
  };

  /**
   * 顧客ID変更イベント
   * @param {ReactSelectOption} e
   */
  const handleOnChangeCustomerID = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        customerId: Integer.parseIntExceptNull(e.target.value),
      };
    });
  };

  /**
   * 入荷予定作成開始日変更イベント
   * @param {ReactSelectOption} e
   */
  const handleOnChangeCreatedAtFrom = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        createdAtFrom: e.target.value,
      };
    });
  };

  /**
   * 入荷予定作成終了日変更イベント
   * @param {ReactSelectOption} e
   */
  const handleOnChangeCreatedAtTo = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        createdAtTo: e.target.value,
      };
    });
  };

  /**
   * 入荷予定開始日変更イベント
   * @param {ReactSelectOption} e
   */
  const handleOnChangeExpectedArrivedOnFrom = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        expectedArrivedOnFrom: e.target.value,
      };
    });
  };

  /**
   * 入荷予定終了日変更イベント
   * @param {ReactSelectOption} e
   */
  const handleOnChangeExpectedArrivedOnTo = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        expectedArrivedOnTo: e.target.value,
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
        <H2 isPageTop>入荷依頼一覧</H2>
        <WhiteWideWrapper>
          <H3>絞り込み検索</H3>
          <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_end} ${commonClasses.justify_between}`}>
            <div className={`${commonClasses.flex__wrapper} ${commonClasses.column}`}>
              <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.c_mr_16}`}>
                <SelectAndLabel
                  id={"receiveStockStatus"}
                  options={receiveStockStatusOptions}
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
              </div>
              <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_end} ${commonClasses.c_mr_16}`}>
                <SelectAndLabel
                  id={"group"}
                  options={groupOptions}
                  text={"班"}
                  isMulti
                  isTopItem
                  changeMultiItemFunction={handleOnChangeGroup}
                />
                <SelectAndLabel
                  id={"employee"}
                  options={employeeOptions}
                  text={"スタッフ名"}
                  isMulti
                  isTopItem
                  changeMultiItemFunction={handleOnChangeEmployee}
                />
                <InputAndLabel
                  id={"customer"}
                  text={"顧客ID"}
                  value={condition.customerId?.toString() || ""}
                  changeFunction={handleOnChangeCustomerID}
                />
                <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_end}`}>
                  <InputAndLabel
                    id={"createdAtFrom"}
                    text={"入荷依頼作成 開始日"}
                    inputType={"date"}
                    value={condition.createdAtFrom || ""}
                    isSmall
                    changeFunction={handleOnChangeCreatedAtFrom}
                  />
                  <div className={`${commonClasses.ml_10} ${commonClasses.mr_10}`}>
                    <Span>～</Span>
                  </div>
                  <InputAndLabel
                    id={"createdAtTo"}
                    text={"入荷依頼作成 終了日"}
                    inputType={"date"}
                    value={condition.createdAtTo || ""}
                    isSmall
                    changeFunction={handleOnChangeCreatedAtTo}
                  />
                </div>
                <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_end}`}>
                  <InputAndLabel
                    id={"expectedArrivedOnFrom"}
                    text={"入荷予定 開始日"}
                    inputType={"date"}
                    value={condition.expectedArrivedOnFrom || ""}
                    isSmall
                    changeFunction={handleOnChangeExpectedArrivedOnFrom}
                  />
                  <div className={`${commonClasses.ml_10} ${commonClasses.mr_10}`}>
                    <Span>～</Span>
                  </div>
                  <InputAndLabel
                    id={"expectedArrivedOnTo"}
                    text={"入荷予定 終了日"}
                    inputType={"date"}
                    value={condition.expectedArrivedOnTo || ""}
                    isSmall
                    changeFunction={handleOnChangeExpectedArrivedOnTo}
                  />
                </div>
              </div>
            </div>
          </div>
        </WhiteWideWrapper>
        {receiveStocks &&
          receiveStocks.map(receiveStock => {
            return (
              <ReceiveStockItem
                key={UUID.generate()}
                receiveStock={receiveStock}
                handleOnClickOpenEditModal={handleOnClickOpenEditModal}
                setSelectedReceiveStock={setSelectedReceiveStock}
              />
            );
          })}
      </div>

      {/* 以下モーダル */}
      {srcOrderDetail && isCreateModalOpen && (
        <ReceiveStockCreateModal
          srcOrderDetail={srcOrderDetail}
          isOpen={isCreateModalOpen}
          handleOnCloseButtonClick={handleOnCreateModalCloseButtonClick}
          handleOnClickStoreButton={handleOnClickStoreButton}
        />
      )}
      {isEditModalOpen && selectedReceiveStock && (
        <ReceiveStockEditModal
          prevReceiveStock={selectedReceiveStock}
          isOpen={isEditModalOpen}
          handleOnCloseButtonClick={handleOnEditModalCloseButtonClick}
          handleOnClickUpdateButton={handleOnClickUpdateButton}
        />
      )}
    </AuthenticatedLayout>
  );
};

export default Template;
