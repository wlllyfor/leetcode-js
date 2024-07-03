"use client";

import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import H2 from "@/components/atoms/h2";
import H3 from "@/components/atoms/h3";
import ReceiveStockReceiveItem from "@/components/molecules/listItem/employee/receiveStock/receiveStockReceiveItem";
import ReceiveStockReceiveModal from "@/components/molecules/modal/employee/receiveStock/receive/receiveStockReceiveModal";
import ReceiveStockEditModal from "@/components/molecules/modal/employee/receiveStock/receive/receiveStockEditModal";
import ReceiveStockInspectModal from "@/components/molecules/modal/employee/receiveStock/receive/receiveStockInspectModal";
import SelectAndLabel from "@/components/molecules/selectAndLabel";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import AuthenticatedLayout from "@/components/molecules/layouts/employee/authenticatedLayout";
import { useIndex } from "@/hooks/employee/receiveStock/useIndex";
import { useIndex as useHubIndex } from "@/hooks/common/hub/useIndex";
import { useIndex as useEmployeeIndex } from "@/hooks/common/employee/useIndex";
import { useIndex as useGroupIndex } from "@/hooks/common/group/useIndex";
import { useModal } from "@/hooks/useModal";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";
import { UUID } from "@/lib/uuid";
import BottomArea from "@/components/molecules/bottomArea/employee/receive-stock/receive/bottomArea";
import { Integer } from "@/lib/integer";

const Template = (): ReactElement => {
  // customHooks
  const { condition, setCondition, getReceiveStocks, receiveStocks } = useIndex();

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

  // 入荷検品用モーダル変数
  const {
    isOpen: isInspectModalOpen,
    setIsOpen: setIsInspectModalOpen,
    handleOnCloseButtonClick: handleOnInspectModalCloseButtonClick,
  } = useModal();

  // 入庫用モーダル変数
  const {
    isOpen: isReceiveModalOpen,
    setIsOpen: setIsReceiveModalOpen,
    handleOnCloseButtonClick: handleOnReceiveModalCloseButtonClick,
  } = useModal();

  // useStatuses
  const [ selectedReceiveStock, setSelectedReceiveStock ] = useState<ReceiveStockDbTableType | null>(null);

  // useEffects

  /**
   * 画面初期化
   */
  useEffect((): void => {
    setIsEditModalOpen(prevState => false);
    setIsInspectModalOpen(prevState => false);
    setIsReceiveModalOpen(prevState => false);
    setCondition(prevState => {
      return {
        ...prevState,
        isUnreceived: true,
      };
    });

    (async (): Promise<void> => {
      // 班の取得は拠点選択時のみ

      await getHubs();
      await getEmployees();
    })();
  }, [ setIsEditModalOpen, setIsInspectModalOpen, setIsReceiveModalOpen, getHubs, getEmployees, setCondition ]);

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
    if (!isEditModalOpen && !isInspectModalOpen && !isReceiveModalOpen && condition.isUnreceived) {
      (async (): Promise<void> => {
        await getReceiveStocks();
      })();
    }
  }, [ isEditModalOpen, isInspectModalOpen, isReceiveModalOpen, condition, getReceiveStocks ]);

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
  const handleOnChangeProductID = (e: ChangeEvent<HTMLInputElement>): void => {
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
   * 検品モーダルオープンイベント
   */
  const handleOnClickOpenInspectModal = (): void => {
    setIsInspectModalOpen(prevState => true);
  };

  /**
   * 入庫モーダルオープンイベント
   */
  const handleOnClickOpenReceiveModal = (): void => {
    setIsReceiveModalOpen(prevState => true);
  };

  /**
   * 編集ボタン押下イベント
   * 処理はモーダルで行う
   */
  const handleOnClickUpdateButton = (): void => {
    setIsEditModalOpen(prevState => false);
  };

  /**
   * 検品ボタン押下イベント
   * 処理はモーダルで行う
   */
  const handleOnClickInspectButton = (): void => {
    setIsInspectModalOpen(prevState => false);
  };

  /**
   * 入庫ボタン押下イベント
   * 処理はモーダルで行う
   */
  const handleOnClickReceiveButton = (): void => {
    setIsReceiveModalOpen(prevState => false);
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
                  value={condition.customerId?.toString() || ""}
                  changeFunction={handleOnChangeCustomerID}
                />
                <InputAndLabel
                  id={"receiveStockId"}
                  text={"入荷ID"}
                  value={condition.receiveStockCode || ""}
                  changeFunction={handleOnChangeReceiveStockID}
                />
                <InputAndLabel
                  id={"productId"}
                  text={"商品ID"}
                  value={condition.productId?.toString() || ""}
                  changeFunction={handleOnChangeProductID}
                />
              </div>
            </div>
          </div>
        </WhiteWideWrapper>
        {receiveStocks &&
          receiveStocks.map(receiveStock => {
            return (
              <ReceiveStockReceiveItem
                key={UUID.generate()}
                receiveStock={receiveStock}
                handleOnClickOpenEditModal={handleOnClickOpenEditModal}
                setSelectedReceiveStock={setSelectedReceiveStock}
              />
            );
          })}
      </div>
      <BottomArea
        handleOnClickOpenInspectModal={handleOnClickOpenInspectModal}
        handleOnClickOpenReceiveModal={handleOnClickOpenReceiveModal}
      />
      {/* 以下モーダル */}
      {isEditModalOpen && selectedReceiveStock && (
        <ReceiveStockEditModal
          prevReceiveStock={selectedReceiveStock}
          isOpen={isEditModalOpen}
          handleOnCloseButtonClick={handleOnEditModalCloseButtonClick}
          handleOnClickUpdateButton={handleOnClickUpdateButton}
        />
      )}
      {isInspectModalOpen && (
        <ReceiveStockInspectModal
          isOpen={isInspectModalOpen}
          handleOnCloseButtonClick={handleOnInspectModalCloseButtonClick}
          handleOnClickInspectButton={handleOnClickInspectButton}
        />
      )}
      {isReceiveModalOpen && (
        <ReceiveStockReceiveModal
          isOpen={isReceiveModalOpen}
          handleOnCloseButtonClick={handleOnReceiveModalCloseButtonClick}
          handleOnClickReceiveButton={handleOnClickReceiveButton}
        />
      )}
    </AuthenticatedLayout>
  );
};

export default Template;
