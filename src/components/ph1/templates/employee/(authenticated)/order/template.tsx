"use client";

import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import H2 from "@/components/atoms/h2";
import H3 from "@/components/atoms/h3";
import OrderItem from "@/components/molecules/listItem/employee/order/orderItem";
import OrderDeleteModal from "@/components/molecules/modal/employee/order/orderDeleteModal";
import OrderEditModal from "@/components/molecules/modal/employee/order/orderEditModal";
import OrderUpdateBulkModal from "@/components/molecules/modal/employee/order/orderUpdateBulkModal";
import SelectAndLabel from "@/components/molecules/selectAndLabel";
import InputAndLabel from "@/components/molecules/inputs/inputAndLabel";
import OrderGroupHeader from "@/components/molecules/listItem/employee/order/orderGroupHeader";
import OrderBottomArea from "@/components/molecules/bottomArea/employee/order/orderBottomArea";
import OrderCancelModal from "@/components/molecules/modal/employee/order/orderCancelModal";
import AuthenticatedLayout from "@/components/molecules/layouts/employee/authenticatedLayout";
import OrderSort from "@/components/molecules/sort";
import { useIndex as useOrderSort } from "@/hooks/enum/orderSort/useIndex";
import { useIndex as useOrderStatuses } from "@/hooks/enum/orderStatuses/useIndex";
import { useIndex as useHubIndex } from "@/hooks/common/hub/useIndex";
import { useIndex as useEmployeeIndex } from "@/hooks/common/employee/useIndex";
import { useIndex as useGroupIndex } from "@/hooks/common/group/useIndex";
import { useModal } from "@/hooks/useModal";
import { useIndex } from "@/hooks/employee/orderDetail/useIndex";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { OrderDetailDbTableType } from "@/types/db/order/orderDetail";
import { routes } from "@/routes";
import { useRouter } from "next/navigation";
import { Integer } from "@/lib/integer";

const Template = (): ReactElement => {
  // custom hooks

  const router = useRouter();

  const { condition, setCondition, getOrderDetails, orderDetails } = useIndex();

  const { getEnums: getOrderSorts, enums: orderSortOptions, defaultOption } = useOrderSort();
  const { getEnums: getOrderStatuses, enums: orderStatusOptions } = useOrderStatuses();
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

  // 削除用モーダル変数
  const {
    isOpen: isDeleteModalOpen,
    setIsOpen: setIsDeleteModalOpen,
    handleOnCloseButtonClick: handleOnDeleteModalCloseButtonClick,
  } = useModal();

  // キャンセル用モーダル変数
  const {
    isOpen: isCancelModalOpen,
    setIsOpen: setIsCancelModalOpen,
    handleOnCloseButtonClick: handleOnCancelModalCloseButtonClick,
  } = useModal();

  // 一括編集モーダル変数
  const {
    isOpen: isBulkEditModalOpen,
    setIsOpen: setIsBulkEditModalOpen,
    handleOnCloseButtonClick: handleOnBulkEditModalCloseButtonClick,
  } = useModal();

  // use states

  const [ checkedIdList, setCheckedIdList ] = useState<number[]>([]);
  const [ selectedOrderDetail, setSelectedOrderDetail ] = useState<OrderDetailDbTableType | null>(null);
  const [ isPushedReceiveStockButton, setIsPushedReceiveStockButton ] = useState<boolean>(false);
  const [ isPushedLeaveStockButton, setIsPushedLeaveStockButton ] = useState<boolean>(false);

  // use effects

  /**
   * 画面初期化
   */
  useEffect((): void => {
    setIsEditModalOpen(prevState => false);
    setIsDeleteModalOpen(prevState => false);
    setIsCancelModalOpen(prevState => false);
    setIsBulkEditModalOpen(prevState => false);
    setIsPushedReceiveStockButton(prevState => false);
    setIsPushedLeaveStockButton(prevState => false);
    setCheckedIdList(prevState => []);

    (async (): Promise<void> => {
      // 班の取得は拠点選択時のみ

      getOrderSorts();
      await getHubs();
      await getEmployees();
      getOrderStatuses("employee");
    })();
  }, [
    setIsEditModalOpen,
    setIsDeleteModalOpen,
    setIsCancelModalOpen,
    setIsBulkEditModalOpen,
    setIsPushedReceiveStockButton,
    setIsPushedLeaveStockButton,
    getOrderSorts,
    getHubs,
    getEmployees,
    getOrderStatuses,
    setCheckedIdList,
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
    if (!isEditModalOpen && !isDeleteModalOpen && !isCancelModalOpen && !isBulkEditModalOpen) {
      (async (): Promise<void> => {
        await getOrderDetails();
      })();
    }
  }, [ isEditModalOpen, isDeleteModalOpen, isCancelModalOpen, isBulkEditModalOpen, condition, getOrderDetails ]);

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

  /**
   * 入荷依頼ボタンが押されたか監視
   */
  useEffect((): void => {
    if (isPushedReceiveStockButton && selectedOrderDetail) {
      router.push(routes.front.employee.receiveStock.requests.url + `?srcOrderDetailId=${selectedOrderDetail.id}`);
    }
  }, [ isPushedReceiveStockButton, router, selectedOrderDetail ]);

  /**
   * 出荷依頼ボタンが押されたか監視
   */
  useEffect((): void => {
    if (isPushedLeaveStockButton && selectedOrderDetail) {
      router.push(routes.front.employee.leaveStock.requests.url + `?srcOrderDetailId=${selectedOrderDetail.id}`);
    }
  }, [ isPushedLeaveStockButton, router, selectedOrderDetail ]);

  // handles

  /**
   * ステータス変更イベント
   * @param {ReactSelectOption} e
   */
  const handleOnChangeOrderStatus = (e: ReactSelectOption[]): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        orderStatusOptions: e,
      };
    });
  };

  /**
   * 拠点変更イベント
   * @param {ReactSelectOption} e
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
   * @param {ReactSelectOption} e
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
   * @param {ReactSelectOption} e
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
        orderId: Integer.parseIntExceptNull(e.target.value),
      };
    });
  };

  /**
   * 表示順変更イベント
   * @param {ReactSelectOption} e
   */
  const handleOnChangeOrderSort = (e: ReactSelectOption): void => {
    setCondition(prevState => {
      return {
        ...prevState,
        orderSort: e,
      };
    });
  };

  /**
   * チェックボックス押下イベント
   *
   * @param checked
   * @param id
   */
  const handleOnChangeChecks = async (checked: boolean, id: number): Promise<void> => {
    setCheckedIdList(prevState => {
      if (checked) {
        if (!prevState.includes(id)) {
          return [ ...prevState, id ];
        }
      } else {
        return prevState.filter(item => item !== id);
      }
      return prevState;
    });
  };

  /**
   * 修正モーダルオープンイベント
   */
  const handleOnClickOpenEditModal = (): void => {
    setIsEditModalOpen(prevState => true);
  };

  /**
   * 削除モーダルオープンイベント
   */
  const handleOnClickOpenDeleteModal = (): void => {
    setIsDeleteModalOpen(prevState => true);
  };

  /**
   * 編集ボタン押下イベント
   * 処理はモーダルで行う
   */
  const handleOnClickUpdateButton = (): void => {
    setIsEditModalOpen(prevState => false);
  };

  /**
   * 削除ボタン押下イベント
   * 処理はモーダルで行う
   */
  const handleOnClickDestroyButton = (): void => {
    setIsDeleteModalOpen(prevState => false);
  };

  /**
   * 入荷依頼ボタン押下イベント
   * 処理はモーダルで行う
   */
  const handleOnClickReceiveStockButton = (): void => {
    setIsPushedReceiveStockButton(prevState => true);
  };

  /**
   * 出荷依頼ボタン押下イベント
   * 処理はモーダルで行う
   */
  const handleOnClickLeaveStockButton = (): void => {
    setIsPushedLeaveStockButton(prevState => true);
  };

  /**
   * 一括編集ボタン押下イベント
   * 処理はモーダルで行う
   */
  const handleOnClickBulkUpdateButton = (): void => {
    setIsBulkEditModalOpen(prevState => false);
  };

  /**
   * キャンセルボタン押下イベント
   * 処理はモーダルで行う
   */
  const handleOnClickCancelButton = (): void => {
    setIsCancelModalOpen(prevState => false);
  };

  return (
    <AuthenticatedLayout>
      <div>
        <H2 isPageTop>注文管理</H2>
        <WhiteWideWrapper>
          <H3>絞り込み検索</H3>
          <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_end} ${commonClasses.justify_between}`}>
            <div className={`${commonClasses.flex__wrapper} ${commonClasses.column}`}>
              <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.c_mr_16}`}>
                <SelectAndLabel
                  id={"status"}
                  options={orderStatusOptions}
                  text={"ステータス"}
                  isMulti
                  isTopItem
                  changeMultiItemFunction={handleOnChangeOrderStatus}
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
                  changeMultiItemFunction={handleOnChangeGroup}
                />
                <SelectAndLabel
                  id={"employee"}
                  options={employeeOptions}
                  text={"スタッフ名"}
                  isMulti
                  changeMultiItemFunction={handleOnChangeEmployee}
                />
                <InputAndLabel
                  id={"customerId"}
                  text={"顧客ID"}
                  value={condition.orderId?.toString() || ""}
                  changeFunction={handleOnChangeCustomerID}
                  title={"YP"}
                />
              </div>
            </div>
          </div>
        </WhiteWideWrapper>
        <OrderSort
          id={"orderSort"}
          options={orderSortOptions}
          value={defaultOption}
          changeFunction={handleOnChangeOrderSort}
          placeholder={defaultOption?.label}
        />
        {orderDetails &&
          orderDetails.map(orderDetail => {
            return (
              <div key={orderDetail.uuid}>
                {/* header */}
                {orderDetail.order && <OrderGroupHeader key={`${orderDetail.uuid}-head`} order={orderDetail.order} />}

                {/* detail */}
                <OrderItem
                  setSelectedOrderDetail={setSelectedOrderDetail}
                  key={`${orderDetail.uuid}-detail`}
                  orderDetail={orderDetail}
                  handleOnChangeChecks={handleOnChangeChecks}
                  handleOnClickOpenEditModal={handleOnClickOpenEditModal}
                  handleOnClickOpenDeleteModal={handleOnClickOpenDeleteModal}
                  handleOnClickReceiveStockButton={handleOnClickReceiveStockButton}
                  handleOnClickLeaveStockButton={handleOnClickLeaveStockButton}
                />
              </div>
            );
          })}
      </div>
      <OrderBottomArea
        checkedCount={checkedIdList.length}
        setIsCancelModalOpen={setIsCancelModalOpen}
        setIsBulkEditModalOpen={setIsBulkEditModalOpen}
      />

      {/* 以下モーダル */}
      {selectedOrderDetail && isEditModalOpen && (
        <OrderEditModal
          prevOrderDetail={selectedOrderDetail}
          isOpen={isEditModalOpen}
          handleOnCloseButtonClick={handleOnEditModalCloseButtonClick}
          handleOnClickUpdateButton={handleOnClickUpdateButton}
        />
      )}
      {selectedOrderDetail && isDeleteModalOpen && (
        <OrderDeleteModal
          prevOrderDetail={selectedOrderDetail}
          isOpen={isDeleteModalOpen}
          handleOnCloseButtonClick={handleOnDeleteModalCloseButtonClick}
          handleOnClickDestroyButton={handleOnClickDestroyButton}
        />
      )}
      {checkedIdList.length > 0 && isCancelModalOpen && (
        <OrderCancelModal
          checkedIdList={checkedIdList}
          isOpen={isCancelModalOpen}
          handleOnCloseButtonClick={handleOnCancelModalCloseButtonClick}
          handleOnClickCancelButton={handleOnClickCancelButton}
        />
      )}
      {checkedIdList.length > 0 && isBulkEditModalOpen && (
        <OrderUpdateBulkModal
          checkedIdList={checkedIdList}
          isOpen={isBulkEditModalOpen}
          handleOnCloseButtonClick={handleOnBulkEditModalCloseButtonClick}
          handleOnClickBulkUpdateButton={handleOnClickBulkUpdateButton}
        />
      )}
    </AuthenticatedLayout>
  );
};

export default Template;
