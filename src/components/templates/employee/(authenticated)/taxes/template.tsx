"use client";

import { ReactElement, useEffect, useState } from "react";
import SearchGroup from "@/components/molecules/search/employee/taxes/searchGroup";
import ButtonGroup from "@/components/molecules/buttonGroup/employee/taxes/buttonGroup";
import TableGroup from "@/components/molecules/tableGroup/employee/taxes/tableGroup";
import MainInner from "@/components/atoms/div/inner/mainInner";
import TaxCreateModal from "@/components/molecules/modalGroup/employee/taxes/taxCreateModal";
import AuthenticatedLayout from "@/components/molecules/layouts/employee/authenticatedLayout";
import { useIndex as useTaxIndex } from "@/hooks/employee/tax/useIndex";
import { useIndex as useHubIndex } from "@/hooks/common/hub/useIndex";
import { ReactSelectOption } from "@/types/reactSelectOptions/ReactSelectOption";
import { useModal } from "@/hooks/useModal";
import { TaxDbTableType } from "@/types/db/tax";
import TaxEditModal from "@/components/molecules/modalGroup/employee/taxes/taxEditModal";
import { If, Then } from "react-if";
import TaxDeleteModal from "@/components/molecules/modalGroup/employee/taxes/taxDeleteModal";

const Template = (): ReactElement => {
  const { taxes, getTaxes, condition, setCondition } = useTaxIndex();
  const { hubs, getHubs } = useHubIndex();
  const [ hubOptions, setHubOptions ] = useState<ReactSelectOption[]>([]);
  const [ selectedHub, setSelectedHub ] = useState<TaxDbTableType | null>(null);

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
        await getTaxes();
      })();
    }
  }, [ getTaxes, isCreateModalOpen, isEditModalOpen, isDeleteModalOpen ]);

  // 検索条件変更時に再描画
  useEffect((): void => {
    (async (): Promise<void> => {
      await getTaxes();
    })();
  }, [ condition, getTaxes ]);

  // 検索条件の拠点が取得できていたらOption設定
  useEffect((): void => {
    if (hubs) {
      const options: ReactSelectOption[] = hubs.map(hub => {
        return {
          value: hub.id,
          label: hub.name,
        };
      });

      setHubOptions(prevState => options);
      setCondition(prevState => {
        return {
          ...prevState,
          hubList: [ options[0] ],
        };
      });
    }
  }, [ hubs, setCondition ]);

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

  const handleOnChangeHub = (options: ReactSelectOption[]): void => {
    setCondition(prevState => {
      return {
        hubList: options,
      };
    });
  };

  return (
    <>
      <AuthenticatedLayout>
        <MainInner>
          <SearchGroup
            value={condition.hubList}
            handleOnChangeHub={handleOnChangeHub} hubOptions={hubOptions}
          />
          <ButtonGroup handleModalButtonClick={handleOnClickOpenCreateModal} />
          <TableGroup
            taxes={taxes}
            handleOnClickEditLink={(tax: TaxDbTableType): void => {
              setSelectedHub(prevState => tax);
              handleOnClickOpenEditModal();
            }}
            handleOnClickDeleteLink={(tax: TaxDbTableType): void => {
              setSelectedHub(prevState => tax);
              handleOnClickOpenDeleteModal();
            }}
          />
        </MainInner>
        <TaxCreateModal isOpen={isCreateModalOpen} handleClose={handleOnCreateModalCloseButtonClick} />
        <If condition={selectedHub !== null && isEditModalOpen}>
          <Then>
            <TaxEditModal
              tax={selectedHub as TaxDbTableType} isOpen={isEditModalOpen}
              handleClose={handleOnEditModalCloseButtonClick}
            />
          </Then>
        </If>
        <If condition={selectedHub !== null && isDeleteModalOpen}>
          <Then>
            <TaxDeleteModal
              tax={selectedHub as TaxDbTableType} isOpen={isDeleteModalOpen}
              handleClose={handleOnDeleteModalCloseButtonClick}
            />
          </Then>
        </If>
      </AuthenticatedLayout>
    </>
  );
};

export default Template;
