"use client";

import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import H2 from "@/components/atoms/h2";
import H3 from "@/components/atoms/h3";
import LeaveStockStatusEditModal from "@/components/molecules/modal/employee/leaveStock/leaveStockStatusEditModal";
import LeaveStockShowModal from "@/components/molecules/modal/employee/leaveStock/leaveStockShowModal";
import SelectAndLabel from "@/components/molecules/selectAndLabel";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import LeaveStockLeaveModal from "@/components/molecules/modal/employee/leaveStock/leaveStockLeaveModal";
import BottomArea from "@/components/molecules/bottomArea/employee/leave-stock/bottomArea";
import AuthenticatedLayout from "@/components/molecules/layouts/employee/authenticatedLayout";
import { useIndex } from "@/hooks/employee/leaveStock/useIndex";
import { useIndex as useHubIndex } from "@/hooks/common/hub/useIndex";
import { useIndex as useEmployeeIndex } from "@/hooks/common/employee/useIndex";
import { useIndex as useGroupIndex } from "@/hooks/common/group/useIndex";
import { useModal } from "@/hooks/useModal";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { Integer } from "@/lib/integer";
import LeaveStockLeaveItem from "@/components/molecules/listItem/employee/leaveStock/leaveStockLeaveItem";
import { UUID } from "@/lib/uuid";
import { LeaveStockTableDbType } from "@/types/db/leaveStock/leaveStock";

const Template = (): ReactElement => {
  // customHooks
  const { leaveStocks, getLeaveStocks, condition, setCondition } = useIndex();

  const { getHubs, options: hubOptions } = useHubIndex();
  const { getEmployees, options: employeeOptions } = useEmployeeIndex();
  const {
    getGroups,
    options: groupOptions,
    setCondition: setGroupIndexCondition,
    condition: groupIndexCondition,
  } = useGroupIndex();

  // 更新用モーダル変数
  const {
    isOpen: isEditModalOpen,
    setIsOpen: setIsEditModalOpen,
    handleOnCloseButtonClick: handleOnEditModalCloseButtonClick,
  } = useModal();

  // 出庫用モーダル変数
  const {
    isOpen: isLeaveModalOpen,
    setIsOpen: setIsLeaveModalOpen,
    handleOnCloseButtonClick: handleOnLeaveModalCloseButtonClick,
  } = useModal();

  // 出庫確認用モーダル変数
  const {
    isOpen: isLeaveToShowModalOpen,
    setIsOpen: setIsLeaveToShowModalOpen,
    handleOnCloseButtonClick: handleOnLeaveToShowModalCloseButtonClick,
  } = useModal();

  // useStatuses
  /**
   * 編集、削除する用
   */
  const [ selectedLeaveStock, setSelectedLeaveStock ] = useState<LeaveStockTableDbType | null>(null);
  /**
   * 出庫処理で閲覧する用。
   */
  const [ selectedLeaveStockToShow, setSelectedLeaveStockToShow ] = useState<LeaveStockTableDbType | null>(null);

  // use effects
  /**
   * 画面初期化
   */
  useEffect((): void => {
    setIsEditModalOpen(prevState => false);
    setIsLeaveModalOpen(prevState => false);
    setIsLeaveToShowModalOpen(prevState => false);
    setSelectedLeaveStock(prevState => null);
    setSelectedLeaveStockToShow(prevState => null);

    setCondition(prevState => {
      return {
        ...prevState,
        isUnLeaved: true,
      };
    });

    (async (): Promise<void> => {
      // 班の取得は拠点選択時のみ

      await getHubs();
      await getEmployees();
    })();
  }, [
    setIsEditModalOpen,
    setIsLeaveModalOpen,
    setIsLeaveToShowModalOpen,
    setSelectedLeaveStock,
    setSelectedLeaveStockToShow,
    getHubs,
    getEmployees,
    setCondition,
  ]);

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
    const isClosed = !isEditModalOpen && !isLeaveModalOpen && !isLeaveToShowModalOpen;
    if (isClosed && condition.isUnLeaved) {
      (async (): Promise<void> => {
        await getLeaveStocks();
      })();
    }
  }, [ isEditModalOpen, condition, isLeaveModalOpen, isLeaveToShowModalOpen, getLeaveStocks ]);

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
   * 従業員変更イベント
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
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChangeCustomerId = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        customerId: Integer.parseIntExceptNull(e.target.value),
      };
    });
  };

  /**
   * 入荷ID変更イベント
   * @param {ReactSelectOption} e
   */
  const handleOnChangeReceiveStockID = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        receiveStockCode: e.target.value,
      };
    });
  };

  /**
   * 商品ID変更イベント
   * @param {ReactSelectOption} e
   */
  const handleOnChangeProductId = (e: ChangeEvent<HTMLInputElement>): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        productId: Integer.parseIntExceptNull(e.target.value),
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
   * 入庫モーダルオープンイベント
   */
  const handleOnClickOpenLeaveModal = (): void => {
    setIsLeaveModalOpen(prevState => true);
    setIsLeaveToShowModalOpen(prevState => false);
  };

  /**
   * 入庫依頼確認モーダルオープンイベント
   */
  const handleOnClickOpenReceiveToShowModal = (): void => {
    setIsLeaveModalOpen(prevState => false);
    setIsLeaveToShowModalOpen(prevState => true);
  };

  /**
   * 編集ボタン押下イベント
   * 処理はモーダルで行う
   */
  const handleOnClickUpdateButton = (): void => {
    setIsEditModalOpen(prevState => false);
  };

  /**
   * 入庫ボタン押下イベント
   * 処理はモーダルで行う
   */
  const handleOnClickLeaveButton = (): void => {
    setIsLeaveModalOpen(prevState => false);
  };

  return (
    <AuthenticatedLayout>
      <div>
        <H2 isPageTop>未入庫在庫一覧</H2>
        <WhiteWideWrapper>
          <H3>絞り込み検索</H3>
          <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_end} ${commonClasses.justify_between}`}>
            <div className={`${commonClasses.flex__wrapper} ${commonClasses.column}`}>
              <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.c_mr_16}`}>
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
                <SelectAndLabel
                  id={"employee"}
                  options={employeeOptions}
                  text={"スタッフ名"}
                  isMulti
                  isTopItem
                  changeMultiItemFunction={handleOnChangeEmployee}
                />
              </div>
              <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_end} ${commonClasses.c_mr_16}`}>
                <InputAndLabel
                  id={"customerId"}
                  text={"顧客ID"}
                  value={condition?.customerId?.toString() || ""}
                  changeFunction={handleOnChangeCustomerId}
                />
                <InputAndLabel
                  id={"receiveCode"}
                  text={"入荷ID"}
                  value={condition?.receiveStockCode || ""}
                  changeFunction={handleOnChangeReceiveStockID}
                />
                <InputAndLabel
                  id={"productId"}
                  text={"商品ID"}
                  value={condition?.productId?.toString() || ""}
                  changeFunction={handleOnChangeProductId}
                />
              </div>
            </div>
          </div>
        </WhiteWideWrapper>
        {leaveStocks &&
          leaveStocks.length > 0 &&
          leaveStocks.map(leaveStock => {
            return (
              <LeaveStockLeaveItem
                key={UUID.generate()}
                leaveStock={leaveStock}
                setSelectedLeaveStock={setSelectedLeaveStock}
                handleOnClickOpenEditModal={handleOnClickOpenEditModal}
              />
            );
          })}
      </div>
      <BottomArea handleOnClickOpenLeaveModal={handleOnClickOpenLeaveModal} />
      {/* 以下モーダル */}

      {isEditModalOpen && selectedLeaveStock && (
        <LeaveStockStatusEditModal
          selectedLeaveStock={selectedLeaveStock}
          isOpen={isEditModalOpen}
          handleOnClickUpdateButton={handleOnClickUpdateButton}
          handleOnCloseButtonClick={handleOnEditModalCloseButtonClick}
        />
      )}
      {isLeaveModalOpen && (
        <LeaveStockLeaveModal
          isOpen={isLeaveModalOpen}
          handleOnClickLeaveButton={handleOnClickLeaveButton}
          handleOnCloseButtonClick={handleOnLeaveModalCloseButtonClick}
          handleOnClickOpenReceiveToShowModal={handleOnClickOpenReceiveToShowModal}
          selectedLeaveStockToShow={selectedLeaveStockToShow}
          setSelectedLeaveStockToShow={setSelectedLeaveStockToShow}
        />
      )}
      {isLeaveToShowModalOpen && (
        <LeaveStockShowModal
          isOpen={isLeaveToShowModalOpen}
          handleOnCloseButtonClick={handleOnLeaveToShowModalCloseButtonClick}
          selectedLeaveStockToShow={selectedLeaveStockToShow}
          setSelectedLeaveStockToShow={setSelectedLeaveStockToShow}
        />
      )}
    </AuthenticatedLayout>
  );
};

export default Template;
