"use client";

import { ReactElement, useEffect, useState } from "react";
import { useIndex } from "@/hooks/customer/shipFromAddress/useIndex";
import { useModal } from "@/hooks/useModal";
import commonClasses from "@/styles/common/page.module.scss";
import H2 from "@/components/atoms/h2";
import SmallButton from "@/components/atoms/button/smallButton";
import ShipFromAddressItem from "@/components/molecules/listItem/customer/shipFromAddressItem";
import icon from "@/resource/img/plus.svg";
import ShipFromAddressCreateModal from "@/components/molecules/modal/customer/shipFromAddress/shipFromAddressCreateModal";
import ShipFromAddressDeleteModal from "@/components/molecules/modal/customer/shipFromAddress/shipFromAddressDeleteModal";
import ShipFromAddressEditModal from "@/components/molecules/modal/customer/shipFromAddress/shipFromAddressEditModal";
import useAuth from "@/hooks/customer/useAuth";
import AuthenticatedLayout from "@/components/molecules/layouts/customer/authenticatedLayout";
import Loading from "@/components/molecules/common/loading";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Paragraph from "@/components/atoms/paragraph";
import { ShipFromAddressDbTableType } from "@/types/db/shipFromAddress";

const Template = ({ hubCode }: { hubCode: string; }): ReactElement => {
  const customer = useAuth();

  const { shipFromAddresses, getShipFromAddresses } = useIndex();

  const [ selectedShipFromAddress, setSelectedShipFromAddress ] = useState<ShipFromAddressDbTableType | null>(null);

  // 配送元登録用モーダル変数
  const {
    isOpen: isCreateModalOpen,
    setIsOpen: setIsCreateModalOpen,
    handleOnCloseButtonClick: handleOnCreateModalCloseButtonClick,
  } = useModal();

  // 配送元更新用モーダル変数
  const {
    isOpen: isEditModalOpen,
    setIsOpen: setIsEditModalOpen,
    handleOnCloseButtonClick: handleOnEditModalCloseButtonClick,
  } = useModal();

  // 配送元削除用モーダル変数
  const {
    isOpen: isDeleteModalOpen,
    setIsOpen: setIsDeleteModalOpen,
    handleOnCloseButtonClick: handleOnDeleteModalCloseButtonClick,
  } = useModal();

  useEffect((): void => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  }, [ setIsCreateModalOpen, setIsEditModalOpen, setIsDeleteModalOpen ]);

  useEffect((): void => {
    if (!isCreateModalOpen && !isDeleteModalOpen && !isEditModalOpen) {
      getShipFromAddresses();
    }
  }, [ isCreateModalOpen, isDeleteModalOpen, isEditModalOpen, getShipFromAddresses ]);

  /**
   * 配送元新規作成モーダルオープンイベント
   */
  const handleOnClickOpenCreateModal = (): void => {
    setIsCreateModalOpen(true);
  };

  /**
   * 編集モーダルオープンイベント
   */
  const handleOnClickOpeEditModal = (): void => {
    setIsEditModalOpen(true);
  };

  /**
   * 削除モーダルオープンイベント
   */
  const handleOnClickOpenDeleteModal = (): void => {
    setIsDeleteModalOpen(true);
  };

  /**
   * 配送元登録ボタン押下イベント
   * 登録処理はモーダルで行う
   */
  const handleOnClickStoreButton = (): void => {
    setIsCreateModalOpen(false);
  };

  /**
   * 配送元登録ボタン押下イベント
   * 登録処理はモーダルで行う
   */
  const handleOnClickUpdateButton = (): void => {
    setIsEditModalOpen(false);
  };

  /**
   * 配送元削除ボタン押下イベント
   * 削除処理はモーダルで行う
   */
  const handleOnClickDestroyButton = (): void => {
    setIsDeleteModalOpen(false);
  };

  if (!customer || !hubCode) {
    return <Loading />;
  }

  return (
    <AuthenticatedLayout hubCode={hubCode}>
      <div>
        <div
          className={`${commonClasses.flex__wrapper} ${commonClasses.justify_between} ${commonClasses.aline_center}`}
        >
          <H2 isPageTop>配送元マスタ</H2>
          <div className={commonClasses.mr_20}>
            <SmallButton text={"追加"} isBlue icon={icon} clickFunction={handleOnClickOpenCreateModal} />
          </div>
        </div>
        {shipFromAddresses && shipFromAddresses.length > 0 ? (
          shipFromAddresses.map(shipFromAddresses => {
            if (shipFromAddresses.id) {
              return (
                <ShipFromAddressItem
                  handleOnClickOpenEditModal={handleOnClickOpeEditModal}
                  handleOnClickOpenDeleteModal={handleOnClickOpenDeleteModal}
                  key={shipFromAddresses.id}
                  shipFromAddress={shipFromAddresses}
                  setSelectedShipFromAddress={setSelectedShipFromAddress}
                />
              );
            }
          })
        ) : (
          <WhiteWideWrapper>
            <Paragraph>検索結果がありません</Paragraph>
          </WhiteWideWrapper>
        )}
      </div>
      {/* 以下モーダル */}
      {isCreateModalOpen && (
        <ShipFromAddressCreateModal
          isOpen={isCreateModalOpen}
          handleOnCloseButtonClick={handleOnCreateModalCloseButtonClick}
          handleOnClickStoreButton={handleOnClickStoreButton}
        />
      )}
      {isEditModalOpen && selectedShipFromAddress && (
        <ShipFromAddressEditModal
          prevShipFromAddress={selectedShipFromAddress}
          isOpen={isEditModalOpen}
          handleOnCloseButtonClick={handleOnEditModalCloseButtonClick}
          handleOnClickUpdateButton={handleOnClickUpdateButton}
        />
      )}
      {isDeleteModalOpen && selectedShipFromAddress && (
        <ShipFromAddressDeleteModal
          prevShipFromAddress={selectedShipFromAddress}
          isOpen={isDeleteModalOpen}
          handleOnCloseButtonClick={handleOnDeleteModalCloseButtonClick}
          handleOnClickDestroyButton={handleOnClickDestroyButton}
        />
      )}
    </AuthenticatedLayout>
  );
};

export default Template;
