"use client";

import { ChangeEvent, ReactElement, useEffect } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import H2 from "@/components/atoms/h2";
import H3 from "@/components/atoms/h3";
import Input from "@/components/atoms/input";
import SmallButton from "@/components/atoms/button/smallButton";
import Paragraph from "@/components/atoms/paragraph";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Select from "@/components/atoms/select";
import icon from "@/resource/img/plus.svg";
import ReceiveStockCreateModal from "@/components/molecules/modal/customer/receiveStock/receiveStockCreateModal";
import AuthenticatedLayout from "@/components/molecules/layouts/customer/authenticatedLayout";
import Loading from "@/components/molecules/common/loading";
import { useModal } from "@/hooks/useModal";
import { useIndex } from "@/hooks/customer/receiveStock/useIndex";
import { useIndex as useReceiveStockIndex } from "@/hooks/enum/receiveStock/useIndex";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import HeaderItem from "@/components/molecules/listItem/customer/receiveStock/headerItem";
import DetailItem from "@/components/molecules/listItem/customer/receiveStock/detailItem";

const Template = ({ hubCode, srcProductIdList }: { hubCode: string; srcProductIdList?: string; }): ReactElement => {
  // custom hooks
  const { getReceiveStocks, receiveStocks, condition, setCondition } = useIndex();

  const { enums, getEnums } = useReceiveStockIndex();

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

    (async (): Promise<void> => {
      await getReceiveStocks();
      getEnums();
    })();
  }, [ setIsCreateModalOpen, setIsEditModalOpen, setIsDeleteModalOpen, getReceiveStocks, getEnums, srcProductIdList ]);

  useEffect((): void => {
    if (!isCreateModalOpen && !isEditModalOpen && !isDeleteModalOpen) {
      (async (): Promise<void> => {
        await getReceiveStocks();
      })();
    }
  }, [ isCreateModalOpen, isEditModalOpen, isDeleteModalOpen, getReceiveStocks ]);

  // handles

  /**
   * 作成モーダルオープンイベント
   */
  const handleOnClickOpenCreateModal = (): void => {
    setIsCreateModalOpen(prevState => true);
  };

  /**
   * 追加ボタン押下イベント
   * 追加処理はモーダルで行う
   */
  const handleOnClickStoreButton = (): void => {
    setIsCreateModalOpen(prevState => false);
  };

  /**
   * 検索条件のSKUの変更イベント
   * @param e
   */
  const handleOnChangeSku = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setCondition(prevState => {
      if (!e.target.value) return prevState;

      return {
        ...condition,
        sku: e.target.value,
      };
    });
  };

  /**
   * 入荷依頼ステータス変更
   * @param e
   */
  const handleOnChangeStatus = async (e: ReactSelectOption[]): Promise<void> => {
    setCondition(prevState => {
      return {
        ...condition,
        receiveStockStatuses: e,
      };
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
            <Select
              options={enums}
              isSearch
              isMulti
              id={"receiveStockStatuses"}
              changeMultiItemFunction={handleOnChangeStatus}
            />
            <div className={`${commonClasses.flex__wrapper} ${commonClasses.aline_center} ${commonClasses.ml_16}`}>
              <Paragraph isSmall>お客様SKU：</Paragraph>
              <Input id={"sku"} value={condition.sku} forSearch changeFunction={handleOnChangeSku} />
            </div>
          </div>
        </WhiteWideWrapper>
        <div
          className={`${commonClasses.flex__wrapper} ${commonClasses.justify_between} ${commonClasses.aline_center}`}
        >
          <H2 isPageTop>入荷依頼</H2>
          <div className={commonClasses.mr_20}>
            <SmallButton text={"入荷依頼"} isBlue icon={icon} clickFunction={handleOnClickOpenCreateModal} />
          </div>
        </div>
        {receiveStocks &&
          receiveStocks.map(receiveStock => {
            return (
              <HeaderItem
                receiveStock={receiveStock}
                key={receiveStock.uuid}
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                handleOnEditModalCloseButtonClick={handleOnEditModalCloseButtonClick}
                isDeleteModalOpen={isDeleteModalOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                handleOnDeleteModalCloseButtonClick={handleOnDeleteModalCloseButtonClick}
              >
                {receiveStock?.receiveStockDetails.map((receiveStockDetail, index) => {
                  return (
                    <DetailItem receiveStockDetail={receiveStockDetail} key={`${receiveStockDetail.uuid}-${index}`} />
                  );
                })}
              </HeaderItem>
            );
          })}
      </div>

      {isCreateModalOpen && (
        <ReceiveStockCreateModal
          hubCode={hubCode}
          srcProductIdList={srcProductIdList}
          isOpen={isCreateModalOpen}
          handleOnClickStoreButton={handleOnClickStoreButton}
          handleOnCloseButtonClick={handleOnCreateModalCloseButtonClick}
        />
      )}
    </AuthenticatedLayout>
  );
};

export default Template;
