"use client";

import { ReactElement, useState, useEffect } from "react";
import SearchGroup from "@/components/molecules/search/employee/receiveStocks/searchGroup";
import TableGroup from "@/components/molecules/tableGroup/employee/receiveStocks/tableGroup";
import MainInner from "@/components/atoms/div/inner/mainInner";
import AuthenticatedLayout from "@/components/molecules/layouts/employee/authenticatedLayout";
import { useIndex as useHubIndex } from "@/hooks/common/hub/useIndex";
import { useIndex as useEmployeeIndex } from "@/hooks/common/employee/useIndex";
import ModalGroup from "@/components/molecules/modalGroup/employee/receiveStocks/modalGroup";
import DeleteModal from "@/components/molecules/modalGroup/employee/receiveStocks/deleteModal";
import { useIndex } from "@/hooks/employee/receiveStock/useIndex";
import { useIndex as useGroupIndex } from "@/hooks/common/group/useIndex";
import { useIndex as useReceiveStockIndex } from "@/hooks/enum/receiveStock/useIndex";
import { useModal } from "@/hooks/useModal";
import { ReceiveStockDbTableType } from "@/types/db/receiveStock/receiveStock";

const Template = (): ReactElement => {
  const { receiveStocks, getReceiveStocks, condition, setCondition } = useIndex();
  const { hubs, getHubs, options: hubOptions } = useHubIndex();
  const { employees, getEmployees, options: employeeOptions } = useEmployeeIndex();
  const [selectedReceiveStock, setSelectedReceiveStock] = useState<ReceiveStockDbTableType | null>(null);

  const { getEnums: getReceiveStockStatuses, enums: receiveStockStatusOptions } = useReceiveStockIndex();
  
  const {
    groups,
    getGroups,
    options: groupOptions,
    setCondition: setGroupIndexCondition,
    condition: groupIndexCondition,
  } = useGroupIndex();

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

  

  // 初期データ取得
  useEffect((): void => {
    getReceiveStockStatuses();
    const fetchData = async (): Promise<void> => {
      await getHubs();
      await getGroups();
      await getEmployees();
      await getReceiveStocks();
    };
    fetchData();
  }, []);

  useEffect((): void => {
    console.log("hubs is:");
    console.log(hubs);
  }, [hubs]);

  useEffect((): void => {
    console.log("groups is:");
    console.log(groups);
  }, [groups]);

  useEffect((): void => {
    console.log("employees is:");
    console.log(employees);
  }, [employees]);

  /**
   * 編集モーダルオープンイベント
   */
  function handleOnClickOpenEditModal(): void {
    setIsEditModalOpen(true);
  }

  /**
   * 削除モーダルオープンイベント
   */
  const handleOnClickOpenDeleteModal = (): void => {
    setIsDeleteModalOpen(true);
  };

  /**
   * 検索条件変更イベント
   */
  const handSearchGroupChange = (key: string, value: any): void => {

    setCondition((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  }

  useEffect(() => {
    getReceiveStocks();
  }, [condition]);

  return (
    <>
      <AuthenticatedLayout>
        <MainInner>
          <SearchGroup 
            receiveStockStatusOptions={receiveStockStatusOptions}
            hubs={hubs}
            onChange={handSearchGroupChange}
          />
          <TableGroup
            hubs={hubs}
            employees={employees}
            receiveStocks={receiveStocks}
            setSelectedReceiveStock={setSelectedReceiveStock}
            handleOnClickEditLink={(receiveStock: ReceiveStockDbTableType) => {
              setSelectedReceiveStock(receiveStock);
              handleOnClickOpenEditModal();
            }}
            handleOnClickDeleteLink={(receiveStock: ReceiveStockDbTableType) => {
              setSelectedReceiveStock(receiveStock);
              handleOnClickOpenDeleteModal();
            }}
          />
        </MainInner>
        {selectedReceiveStock && isEditModalOpen && (
          <ModalGroup
            isOpen={isEditModalOpen}
            selectedReceiveStock={selectedReceiveStock as ReceiveStockDbTableType}
            handleClose={handleOnEditModalCloseButtonClick}
          />
        )}
        {selectedReceiveStock && isDeleteModalOpen && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            handleClose={handleOnDeleteModalCloseButtonClick}
          />
        )}
      </AuthenticatedLayout>
    </>
  );
};

export default Template;



