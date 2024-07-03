"use client";

import { ReactElement, useEffect, useState } from "react";
import commonClasses from "@/styles/common/page.module.scss";
import H2 from "@/components/atoms/h2";
import SmallButton from "@/components/atoms/button/smallButton";
import { useIndex } from "@/hooks/customer/shipToAddress/useIndex";
import { useModal } from "@/hooks/useModal";
import ShipToAddressItem from "@/components/molecules/listItem/customer/shipToAddressItem";
import icon from "@/resource/img/plus.svg";
import ShipToAddressCreateModal from "@/components/molecules/modal/customer/shipToAddress/shipToAddressCreateModal";
import ShipToAddressDeleteModal from "@/components/molecules/modal/customer/shipToAddress/shipToAddressDeleteModal";
import ShipToAddressEditModal from "@/components/molecules/modal/customer/shipToAddress/shipToAddressEditModal";
import useAuth from "@/hooks/customer/useAuth";
import AuthenticatedLayout from "@/components/molecules/layouts/customer/authenticatedLayout";
import Loading from "@/components/molecules/common/loading";
import WhiteWideWrapper from "@/components/atoms/div/wrapper/whiteWideWrapper";
import Paragraph from "@/components/atoms/paragraph";
import { ShipToAddressDbTableType } from "@/types/db/shipToAddress";

const Template = ({ hubCode }: { hubCode: string; }): ReactElement => {
  const customer = useAuth();

  const { shipToAddresses, getShipToAddresses } = useIndex();

  const [ selectedShipToAddress, setSelectedShipToAddress ] = useState<ShipToAddressDbTableType | null>(null);

  // 配送先登録用モーダル変数
  const {
    isOpen: isCreateModalOpen,
    setIsOpen: setIsCreateModalOpen,
    handleOnCloseButtonClick: handleOnCreateModalCloseButtonClick,
  } = useModal();

  // 配送先更新用モーダル変数
  const {
    isOpen: isEditModalOpen,
    setIsOpen: setIsEditModalOpen,
    handleOnCloseButtonClick: handleOnEditModalCloseButtonClick,
  } = useModal();

  // 配送先削除用モーダル変数
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
      getShipToAddresses();
    }
  }, [ isCreateModalOpen, isDeleteModalOpen, isEditModalOpen, getShipToAddresses ]);

  /**
   * 配送先新規作成モーダルオープンイベント
   */
  const handleOnClickOpenCreateModal = (): void => {
    setIsCreateModalOpen(true);
  };

  /**
   * 編集モーダルオープンイベント
   */
  const handleOnClickOpenEditModal = (): void => {
    setIsEditModalOpen(true);
  };

  /**
   * 削除モーダルオープンイベント
   */
  const handleOnClickOpenDeleteModal = (): void => {
    setIsDeleteModalOpen(true);
  };

  /**
   * 配送先登録ボタン押下イベント
   * 登録処理はモーダルで行う
   */
  const handleOnClickStoreButton = (): void => {
    setIsCreateModalOpen(false);
  };

  /**
   * 配送先登録ボタン押下イベント
   * 登録処理はモーダルで行う
   */
  const handleOnClickUpdateButton = (): void => {
    setIsEditModalOpen(false);
  };

  /**
   * 配送先削除ボタン押下イベント
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
          <H2 isPageTop>配送先マスタ</H2>
          <div className={commonClasses.mr_20}>
            <SmallButton text={"追加"} isBlue icon={icon} clickFunction={handleOnClickOpenCreateModal} />
          </div>
        </div>
        {shipToAddresses && shipToAddresses.length > 0 ? (
          shipToAddresses.map(shipToAddresses => {
            if (shipToAddresses.id) {
              return (
                <ShipToAddressItem
                  handleOnClickOpenEditModal={handleOnClickOpenEditModal}
                  handleOnClickOpenDeleteModal={handleOnClickOpenDeleteModal}
                  key={shipToAddresses.id}
                  shipToAddress={shipToAddresses}
                  setSelectedShipToAddress={setSelectedShipToAddress}
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
        <ShipToAddressCreateModal
          isOpen={isCreateModalOpen}
          handleOnCloseButtonClick={handleOnCreateModalCloseButtonClick}
          handleOnClickStoreButton={handleOnClickStoreButton}
        />
      )}
      {selectedShipToAddress && isEditModalOpen && (
        <ShipToAddressEditModal
          prevShipToAddress={selectedShipToAddress}
          isOpen={isEditModalOpen}
          handleOnCloseButtonClick={handleOnEditModalCloseButtonClick}
          handleOnClickUpdateButton={handleOnClickUpdateButton}
        />
      )}
      {selectedShipToAddress && isDeleteModalOpen && (
        <ShipToAddressDeleteModal
          prevShipToAddress={selectedShipToAddress}
          isOpen={isDeleteModalOpen}
          handleOnCloseButtonClick={handleOnDeleteModalCloseButtonClick}
          handleOnClickDestroyButton={handleOnClickDestroyButton}
        />
      )}
    </AuthenticatedLayout>
  );
};

export default Template;
