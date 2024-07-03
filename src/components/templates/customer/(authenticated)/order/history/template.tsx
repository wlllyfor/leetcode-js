"use client";

import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import H2 from "@/components/atoms/h2";
import H3 from "@/components/atoms/h3";
import Input from "@/components/atoms/input";
import Paragraph from "@/components/atoms/paragraph";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import OrderHistoryItem from "@/components/molecules/listItem/customer/order/orderHistoryItem";
import Select from "@/components/atoms/select";
import Span from "@/components/atoms/span";
import ReorderModal from "@/components/molecules/modal/customer/order/reorderModal";
import OrderCancelModal from "@/components/molecules/modal/customer/order/orderCancelModal";
import AuthenticatedLayout from "@/components/molecules/layouts/customer/authenticatedLayout";
import OrderBottomArea from "@/components/molecules/bottomArea/customer/order/orderBottomArea";
import OrderSort from "@/components/molecules/sort";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { useModal } from "@/hooks/useModal";
import { useIndex } from "@/hooks/customer/order/useIndex";
import { useIndex as useOrderSort } from "@/hooks/enum/orderSort/useIndex";
import { useIndex as useOrderStatuses } from "@/hooks/enum/orderStatuses/useIndex";
import { useFind } from "@/hooks/common/hub/useFind";

const Template = ({ hubCode }: { hubCode: string; }): ReactElement => {
  // custom hooks
  // キャンセル用モーダル変数
  const {
    isOpen: isCancelModalOpen,
    setIsOpen: setIsCancelModalOpen,
    handleOnCloseButtonClick: handleOnCancelModalCloseButtonClick,
  } = useModal();

  // 再注文用モーダル変数
  const {
    isOpen: isReorderModalOpen,
    setIsOpen: setIsReorderModalOpen,
    handleOnCloseButtonClick: handleOnReorderModalCloseButtonClick,
  } = useModal();

  const {
    orderStatuses,
    setOrderStatuses,
    orderCode,
    setOrderCode,
    sku,
    setSku,
    orderedOnFrom,
    setOrderedOnFrom,
    orderedOnTo,
    setOrderedOnTo,
    orderDetails,
    getOrderDetails,
    // setOrderDetails,
    orderSort,
    setOrderSort,
  } = useIndex();

  const { hub, getHub, setCode, code: hubCodeForFind } = useFind();

  const { getEnums: getOrderSorts, enums: orderSortOptions } = useOrderSort();

  const { getEnums: getOrderStatuses, enums: orderStatusOptions } = useOrderStatuses();

  const [ checkedIdList, setCheckedIdList ] = useState<number[]>([]);

  // レンダリング中かどうかのフラグ
  const [ isFirstRender, setIsFirstRender ] = useState<boolean>(true);

  // useStates
  /**
   * URLパラメータの拠点コードを設定
   */
  useEffect((): void => {
    if (hubCode) {
      setCode(prevState => hubCode);
    }
  }, [ hubCode, setCode ]);

  /**
   * 拠点コードが設定されたら検索
   */
  useEffect((): void => {
    if (hubCodeForFind) {
      (async (): Promise<void> => {
        await getHub();
      })();
    }
  }, [ hubCodeForFind, getHub ]);

  /**
   * 画面初期化
   */
  useEffect((): void => {
    setIsCancelModalOpen(prevState => false);
    setIsReorderModalOpen(prevState => false);
    setCheckedIdList(prevState => []);

    (async (): Promise<void> => {
      await getOrderSorts();
      await getOrderStatuses("customer");
      await getOrderDetails();
    })();
  }, [ setIsCancelModalOpen, setIsReorderModalOpen, getOrderDetails, getOrderSorts, getOrderStatuses, setCheckedIdList ]);

  useEffect((): void => {
    if (!isFirstRender) {
      (async (): Promise<void> => {
        await getOrderDetails();
      })();
    } else {
      setIsFirstRender(prevState => false);
    }
  }, [ getOrderDetails, isFirstRender, orderStatuses, orderCode, sku, orderedOnFrom, orderedOnTo, orderSort ]);

  useEffect((): void => {
    if (!isFirstRender) {
      if (!isCancelModalOpen && !isReorderModalOpen)
        (async (): Promise<void> => {
          await getOrderDetails();
        })();
    } else {
      setIsFirstRender(prevState => false);
    }
  }, [ isCancelModalOpen, isReorderModalOpen, getOrderDetails, isFirstRender ]);

  // handles

  /**
   * キャンセル依頼ボタン押下イベント
   * 処理はモーダルで行う
   */
  const handleOnClickCancelButton = (): void => {
    setIsCancelModalOpen(prevState => false);
  };

  /**
   * 再注文依頼ボタン押下イベント
   * 処理はモーダルで行う
   */
  const handleOnClickReorderButton = (): void => {
    setIsReorderModalOpen(prevState => false);
  };

  /**
   * 注文ステータス 変更イベント
   * @param e
   */
  const handleOnChangeOrderStatus = async (e: ReactSelectOption[]): Promise<void> => {
    setOrderStatuses(prevState => e);
  };

  /**
   * 注文ID（注文コード） 変更イベント
   * @param e
   */
  const handleOnChangeOrderCode = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setOrderCode(prevState => e.target.value);
  };

  /**
   * SKU 変更イベント
   * @param e
   */
  const handleOnChangeSku = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setSku(prevState => e.target.value);
  };

  /**
   * 注文日From 変更イベント
   * @param e
   */
  const handleOnOrderedOnFrom = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setOrderedOnFrom(prevState => e.target.value);
  };

  /**
   * 注文日From 変更イベント
   * @param e
   */
  const handleOnOrderedOnTo = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setOrderedOnTo(prevState => e.target.value);
  };

  /**
   * 注文表示順 変更イベント
   * @param e
   */
  const handleOnChangeOrderSort = async (e: ReactSelectOption): Promise<void> => {
    setOrderSort(prevState => e);
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

  return (
    <AuthenticatedLayout hubCode={hubCode}>
      <div>
        <WhiteWideWrapper>
          <H3>絞り込み検索</H3>
          <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_start}`}>
            <Select
              id={"orderStatuses"}
              options={orderStatusOptions}
              isSearch
              isMulti
              value={null}
              changeMultiItemFunction={handleOnChangeOrderStatus}
            />
            <div className={`${commonClasses.flex__wrapper} ${commonClasses.column} ${commonClasses.ml_16}`}>
              <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.c_mr_16}`}>
                <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center}`}>
                  <Paragraph isSmall>注文ID：</Paragraph>
                  <Input id={"orderCode"} value={orderCode} forSearch changeFunction={handleOnChangeOrderCode} />
                </div>
                <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center}`}>
                  <Paragraph isSmall>お客様SKU：</Paragraph>
                  <Input id={"sku"} value={sku} forSearch changeFunction={handleOnChangeSku} />
                </div>
              </div>
              <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.mt_8}`}>
                <Paragraph isSmall>注文日：</Paragraph>
                <Input
                  id={"orderedOnFrom"}
                  value={orderedOnFrom}
                  forSearch
                  inputType={"date"}
                  changeFunction={handleOnOrderedOnFrom}
                />
                <Span isBetween>～</Span>
                <Input
                  id={"orderedOnTo"}
                  value={orderedOnTo}
                  forSearch
                  inputType={"date"}
                  changeFunction={handleOnOrderedOnTo}
                />
              </div>
            </div>
          </div>
        </WhiteWideWrapper>
        <OrderSort id={"orderSort"} options={orderSortOptions} value={null} changeFunction={handleOnChangeOrderSort} />
        <H2 isPageTop>注文履歴</H2>
        {orderDetails &&
          orderDetails.map(orderDetail => {
            return (
              orderDetail.order && (
                <OrderHistoryItem
                  hub={hub}
                  orderDetail={orderDetail}
                  handleOnChangeChecks={handleOnChangeChecks}
                  key={orderDetail.uuid}
                />
              )
            );
          })}
      </div>
      <OrderBottomArea
        checkedCount={checkedIdList.length}
        setIsCancelModalOpen={setIsCancelModalOpen}
        setIsReorderModalOpen={setIsReorderModalOpen}
      />
      {/* 以下 モーダル */}
      {isReorderModalOpen && (
        <ReorderModal
          isOpen={isReorderModalOpen}
          checkedIdList={checkedIdList}
          handleOnCloseButtonClick={handleOnReorderModalCloseButtonClick}
          handleOnClickReorderButton={handleOnClickReorderButton}
        />
      )}
      {isCancelModalOpen && (
        <OrderCancelModal
          isOpen={isCancelModalOpen}
          checkedIdList={checkedIdList}
          handleOnCloseButtonClick={handleOnCancelModalCloseButtonClick}
          handleOnClickCancelButton={handleOnClickCancelButton}
        />
      )}
    </AuthenticatedLayout>
  );
};

export default Template;
