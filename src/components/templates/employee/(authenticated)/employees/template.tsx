"use client";

import { ReactElement, useEffect, useState } from "react";
import SearchGroup from "@/components/molecules/search/employee/employees/searchGroup";
import ButtonGroup from "@/components/molecules/buttonGroup/employee/employees/buttonGroup";
import TableGroup from "@/components/molecules/tableGroup/employee/employees/tableGroup";
import MainInner from "@/components/atoms/div/inner/mainInner";
import AuthenticatedLayout from "@/components/molecules/layouts/employee/authenticatedLayout";
import { useModal } from "@/hooks/useModal";
import { useIndex as useEmployeeIndex } from "@/hooks/common/employee/useIndex";
import EmployeeCreateModal from "@/components/molecules/modalGroup/employee/employees/employeeCreateModal";
import { If, Then } from "react-if";
import { useIndex as useHubIndex } from "@/hooks/common/hub/useIndex";
import { useIndex as useJobPositionIndex } from "@/hooks/common/jobPosition/useIndex";
import EmployeeEditModal from "@/components/molecules/modalGroup/employee/employees/employeeEditModal";
import { EmployeeDbTableType } from "@/types/db/employee";
import { useEmployeesFilter } from "@/hooks/employee/employees/useEmployeesFilter";

const Template = (): ReactElement => {
  const { employees, getEmployees } = useEmployeeIndex();
  const { hubs, getHubs, options: hubsOptions } = useHubIndex();
  const { jobPositions, getJobPositions } = useJobPositionIndex();

  const [ selectedEmployee, setSelectedEmployee ] = useState<EmployeeDbTableType | null>();

  const {
    defaultHubOptions,
    defaultGroupOptions,
    filteredEmployees,
    filterEmployees,
    isDefaultJobPositionChecked,
    selectJobPosition,
    selectableJobPositions,
    handleCheckJobPositionChange,
    handleSelectJobPositionChange,
    setSelectJobPosition,
    filteredName,
    setFilteredName,
    filteredNameKana,
    setFilteredNameKana,
    filteredStaffId,
    setFilteredStaffId,
  } = useEmployeesFilter(employees);

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


  // 画面表示時に検索条件取得と初期化
  useEffect((): void => {
    setIsCreateModalOpen(prevState => false);
    setIsEditModalOpen(prevState => false);
  }, [ setIsCreateModalOpen, setIsEditModalOpen ]);

  // モーダルが閉じた時に再描画
  useEffect((): void => {
    if (!isCreateModalOpen && !isEditModalOpen) {
      (async (): Promise<void> => {
        await getEmployees();
        getHubs();
        getJobPositions();
      })();
    }
  }, [ getEmployees, isCreateModalOpen, isEditModalOpen, getHubs, getJobPositions ]);

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

  const hubsProps = {
    options: hubsOptions,
    defaultOption: defaultHubOptions,
    allHubs: hubs,
  };

  const groupsProps = {
    defaultOption: defaultGroupOptions,
  };

  const jobPositionsProps = {
    options: selectableJobPositions,
    selectOption: selectJobPosition,
    checked: isDefaultJobPositionChecked,
    changeMultiFunction: handleSelectJobPositionChange,
    changeCheckFunction: handleCheckJobPositionChange,
    setSelectJobPosition: setSelectJobPosition,
  };

  const nameProps = {
    filteredName: filteredName,
    setFilteredName: setFilteredName,
  };

  const nameKanaProps = {
    filteredNameKana: filteredNameKana,
    setFilteredNameKana: setFilteredNameKana,
  };

  const staffIdProps = {
    filteredStaffId: filteredStaffId,
    setFilteredStaffId: setFilteredStaffId,
  };

  return (
    <>
      <AuthenticatedLayout>
        <MainInner>
          <SearchGroup
            employees={employees}
            hubs={hubsProps}
            groups={groupsProps}
            jobPositions={jobPositionsProps}
            name={nameProps}
            nameKana={nameKanaProps}
            staffId={staffIdProps}
            filterFunction={filterEmployees}
          />
          <ButtonGroup handleModalButtonClick={handleOnClickOpenCreateModal} />
          <TableGroup
            employees={filteredEmployees}
            hubs={hubs}
            jobPositions={jobPositions}
            handleOnClickEditLink={(employee: EmployeeDbTableType): void => {
              setSelectedEmployee(prevState => employee);
              handleOnClickOpenEditModal();
            }}
          />
        </MainInner>
        <If condition={isCreateModalOpen}>
          <Then>
            <EmployeeCreateModal
              isOpen={isCreateModalOpen}
              handleClose={handleOnCreateModalCloseButtonClick}
            />
          </Then>
        </If>
        <If condition={selectedEmployee !== null && isEditModalOpen}>
          <Then>
            <EmployeeEditModal
              isOpen={isEditModalOpen}
              handleClose={handleOnEditModalCloseButtonClick}
              employee={selectedEmployee as EmployeeDbTableType}
            />
          </Then>
        </If>
      </AuthenticatedLayout>
    </>
  );
};

export default Template;
