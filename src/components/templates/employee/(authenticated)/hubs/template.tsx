"use client";

import { ReactElement, useEffect, useState } from "react";
import ButtonGroup from "@/components/molecules/buttonGroup/employee/hubs/buttonGroup";
import TableGroup from "@/components/molecules/tableGroup/employee/hubs/tableGroup";
import MainInner from "@/components/atoms/div/inner/mainInner";
import HubCreateModal from "@/components/molecules/modalGroup/employee/hubs/hubCreateModal";
import { useIndex as useHubIndex } from "@/hooks/common/hub/useIndex";
import AuthenticatedLayout from "@/components/molecules/layouts/employee/authenticatedLayout";
import { useModal } from "@/hooks/useModal";
import { HubDbTableType } from "@/types/db/hub";
import { If, Then } from "react-if";
import HubDeleteModal from "@/components/molecules/modalGroup/employee/hubs/hubDeleteModal";
import HubEditModal from "@/components/molecules/modalGroup/employee/hubs/hubEditModal";

const Template = (): ReactElement => {
  const { hubs, getHubs } = useHubIndex();
  const [ selectedHub, setSelectedHub ] = useState<HubDbTableType | null>(null);

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

  // 画面表示時に検索条件取得と初期化
  useEffect((): void => {
    setIsCreateModalOpen(prevState => false);
    setIsEditModalOpen(prevState => false);
    setIsDeleteModalOpen(prevState => false);

    (async (): Promise<void> => {
      await getHubs();
    })();
  }, [ getHubs, setIsCreateModalOpen, setIsEditModalOpen, setIsDeleteModalOpen ]);

  // モーダルが閉じた時に再描画
  useEffect((): void => {
    if (!isCreateModalOpen && !isEditModalOpen && !isDeleteModalOpen) {
      (async (): Promise<void> => {
        await getHubs();
      })();
    }
  }, [ getHubs, isCreateModalOpen, isEditModalOpen, isDeleteModalOpen ]);

  // handles

  /**
   * 作成モーダルオープンイベント
   */
  const handleOnClickOpenCreateModal = (): void => {
    setIsCreateModalOpen(prevState => true);
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

  return (
    <>
      <AuthenticatedLayout>
        <div className="mt-8">
          <MainInner>
            <ButtonGroup handleModalButtonClick={() => {
              setSelectedHub(prevState => null);
              handleOnClickOpenCreateModal();
            }}
            />
            <TableGroup
              hubs={hubs}
              handleOnClickEditLink={(hub: HubDbTableType) => {
                setSelectedHub(prevState => hub);
                handleOnClickOpenEditModal();
              }}
              handleOnClickDeleteLink={(hub: HubDbTableType) => {
                setSelectedHub(prevState => hub);
                handleOnClickOpenDeleteModal();
              }}
            />
          </MainInner>
          <If condition={isCreateModalOpen}>
            <Then>
              <HubCreateModal
                isOpen={isCreateModalOpen}
                handleClose={handleOnCreateModalCloseButtonClick}
              />
            </Then>
          </If>
          <If condition={selectedHub !== null && isEditModalOpen}>
            <Then>
              <HubEditModal
                isOpen={isEditModalOpen}
                handleClose={handleOnEditModalCloseButtonClick}
                hub={selectedHub as HubDbTableType}
              />
            </Then>
          </If>
          <If condition={selectedHub !== null && isDeleteModalOpen}>
            <Then>
              <HubDeleteModal
                isOpen={isDeleteModalOpen}
                handleClose={handleOnDeleteModalCloseButtonClick}
                hub={selectedHub as HubDbTableType}
              />
            </Then>
          </If>
        </div>
      </AuthenticatedLayout>
    </>
  );
};

export default Template;
