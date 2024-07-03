"use client";

import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import H2 from "@/components/atoms/h2";
import H3 from "@/components/atoms/h3";
import Input from "@/components/atoms/input";
import SmallButton from "@/components/atoms/button/smallButton";
import Paragraph from "@/components/atoms/paragraph";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import LeaveStockCreateModal from "@/components/molecules/modal/customer/leaveStock/leaveStockCreateModal";
import Select from "@/components/atoms/select";
import AuthenticatedLayout from "@/components/molecules/layouts/customer/authenticatedLayout";
import LeaveStockBottomArea from "@/components/molecules/bottomArea/customer/leave-stock/leaveStockBottomArea";
import Loading from "@/components/molecules/common/loading";
import HeaderItem from "@/components/molecules/listItem/customer/leaveStock/headerItem";
import DetailItem from "@/components/molecules/listItem/customer/leaveStock/detailItem";
import { useModal } from "@/hooks/useModal";
import { useIndex } from "@/hooks/customer/leaveStock/useIndex";
import { useIndex as useLeaveStatusIndex } from "@/hooks/enum/leaveStock/useIndex";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import LeaveStockCancelModal from "@/components/molecules/modal/customer/leaveStock/leaveStockCancelModal";

const Template = ({ hubCode, srcProductIdList }: { hubCode: string; srcProductIdList?: string; }): ReactElement => {
  const {
    leaveStocks,
    // setLeaveStocks,
    getLeaveStocks,
    condition,
    setCondition,
  } = useIndex();

  const { getEnums, enums } = useLeaveStatusIndex();

  const [ checkedIdList, setCheckedIdList ] = useState<number[]>([]);

  // 登録用モーダル変数
  const {
    isOpen: isCreateModalOpen,
    setIsOpen: setIsCreateModalOpen,
    handleOnCloseButtonClick: handleOnCreateModalCloseButtonClick,
  } = useModal();

  // 修正用モーダル変数
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

  // useEffects
  useEffect((): void => {
    // 他画面から遷移してきたらURLパラメータにsrcProductIdListが入ってくる
    if (srcProductIdList) {
      setIsCreateModalOpen(prevState => true);
    } else {
      setIsCreateModalOpen(prevState => false);
    }
    setIsEditModalOpen(prevState => false);
    setIsDeleteModalOpen(prevState => false);
    setIsCancelModalOpen(prevState => false);
    setCheckedIdList(prevState => []);

    (async (): Promise<void> => {
      await getLeaveStocks();
      getEnums();
    })();
  }, [
    setIsCreateModalOpen,
    setIsEditModalOpen,
    setIsDeleteModalOpen,
    setIsCancelModalOpen,
    getLeaveStocks,
    getEnums,
    setCheckedIdList,
    srcProductIdList,
  ]);

  /**
   * モーダルが閉じた場合の再検索
   */
  useEffect((): void => {
    if (!isCreateModalOpen && !isEditModalOpen && !isDeleteModalOpen && !isCancelModalOpen) {
      (async (): Promise<void> => {
        // 一覧表示
        await getLeaveStocks();
      })();
    }
  }, [ isCreateModalOpen, isEditModalOpen, isDeleteModalOpen, isCancelModalOpen, getLeaveStocks ]);

  /**
   * 条件が更新された場合の再検索
   */
  useEffect((): void => {
    (async (): Promise<void> => {
      // 一覧表示
      await getLeaveStocks();
    })();
  }, [ condition, getLeaveStocks ]);

  // handles

  /**
   * 作成モーダルオープンイベント
   */
  const handleOnClickOpenCreateModal = (): void => {
    setIsCreateModalOpen(prevState => true);
  };

  /**
   * 出荷依頼ボタン押下イベント
   * 追加処理はモーダルで行う
   */
  const handleOnClickStoreButton = (): void => {
    setIsCreateModalOpen(prevState => false);
  };

  /**
   * キャンセル依頼ボタン押下イベント
   * キャンセル処理はモーダルで行う
   */
  const handleOnClickCancelButton = (): void => {
    setIsCancelModalOpen(prevState => false);
  };

  /**
   * 入荷依頼ステータス変更
   * @param e
   */
  const handleOnChangeStatus = async (e: ReactSelectOption[]): Promise<void> => {
    setCondition(prevState => {
      return {
        ...condition,
        leaveStockStatuses: e,
      };
    });
  };

  /**
   * 検索条件のSKUの変更イベント
   * @param e
   */
  const handleOnChangeSku = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setCondition(prevState => {
      return {
        ...condition,
        sku: e.target.value,
      };
    });
  };

  /**
   * 検索条件の配送先配送元名称の変更イベント
   * @param e
   */
  const handleOnChangeName = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setCondition(prevState => {
      return {
        ...condition,
        name: e.target.value,
      };
    });
  };

  /**
   * 検索条件の追跡番号の変更イベント
   * @param e
   */
  const handleOnChangeTrackingNo = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setCondition(prevState => {
      return {
        ...condition,
        trackingNo: e.target.value,
      };
    });
  };

  /**
   * 検索条件の注文番号の変更イベント
   * @param e
   */
  const handleOnChangeOrderCode = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setCondition(prevState => {
      return {
        ...condition,
        orderCode: e.target.value,
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

  // loading condition
  if (!hubCode) {
    return <Loading />;
  }

  return (
    <AuthenticatedLayout hubCode={hubCode}>
      <div>
        <WhiteWideWrapper>
          <H3>絞り込み検索</H3>
          <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_end}`}>
            <Select options={enums} isSearch isMulti id={"something"} changeMultiItemFunction={handleOnChangeStatus} />
            <div className={`${commonClasses.flex__wrapper} ${commonClasses.column} ${commonClasses.ml_16}`}>
              <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.c_mr_16}`}>
                <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center}`}>
                  <Paragraph isSmall>お客様SKU：</Paragraph>
                  <Input id={"condition.sku"} value={condition.sku} forSearch changeFunction={handleOnChangeSku} />
                </div>
                <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center}`}>
                  <Paragraph isSmall>配送先配送元：</Paragraph>
                  <Input id={"condition.name"} value={condition.name} forSearch changeFunction={handleOnChangeName} />
                </div>
              </div>
              <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.mt_8}`}>
                <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center}`}>
                  <Paragraph isSmall>追跡番号：</Paragraph>
                  <Input
                    id={"condition.trackingNo"}
                    value={condition.trackingNo}
                    forSearch
                    changeFunction={handleOnChangeTrackingNo}
                  />
                </div>
                <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center}`}>
                  <Paragraph isSmall>注文ID：</Paragraph>
                  <Input
                    id={"condition.orderCode"}
                    value={condition.orderCode}
                    forSearch
                    changeFunction={handleOnChangeOrderCode}
                  />
                </div>
              </div>
            </div>
          </div>
        </WhiteWideWrapper>
        <div
          className={`${commonClasses.flex__wrapper} ${commonClasses.justify_between} ${commonClasses.aline_center}`}
        >
          <H2 isPageTop>出荷依頼</H2>
          <div className={commonClasses.mr_20}>
            <SmallButton text={"出荷依頼"} isBlue clickFunction={handleOnClickOpenCreateModal} />
          </div>
        </div>
        {leaveStocks &&
          leaveStocks.map(leaveStock => (
            <HeaderItem
              leaveStock={leaveStock}
              key={leaveStock.uuid}
              setIsEditModalOpen={setIsEditModalOpen}
              isEditModalOpen={isEditModalOpen}
              handleOnChangeChecks={handleOnChangeChecks}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              isDeleteModalOpen={isDeleteModalOpen}
              handleOnEditModalCloseButtonClick={handleOnEditModalCloseButtonClick}
              handleOnDeleteModalCloseButtonClick={handleOnDeleteModalCloseButtonClick}
            >
              {leaveStock?.leaveStockProducts.map((leaveStockProduct, index) => {
                return <DetailItem leaveStockProduct={leaveStockProduct} key={`${leaveStockProduct.uuid}-${index}`} />;
              })}
            </HeaderItem>
          ))}
      </div>
      <LeaveStockBottomArea checkedIdList={checkedIdList} setIsCancelModalOpen={setIsCancelModalOpen} />

      {/* 以下モーダル */}
      {isCreateModalOpen && (
        <LeaveStockCreateModal
          hubCode={hubCode}
          srcProductIdList={srcProductIdList}
          isOpen={isCreateModalOpen}
          handleOnClickStoreButton={handleOnClickStoreButton}
          handleOnCloseButtonClick={handleOnCreateModalCloseButtonClick}
        />
      )}

      {isCancelModalOpen && (
        <LeaveStockCancelModal
          checkedIdList={checkedIdList}
          isOpen={isCancelModalOpen}
          handleOnClickCancelButton={handleOnClickCancelButton}
          handleOnCloseButtonClick={handleOnCancelModalCloseButtonClick}
        />
      )}
    </AuthenticatedLayout>
  );
};

export default Template;
