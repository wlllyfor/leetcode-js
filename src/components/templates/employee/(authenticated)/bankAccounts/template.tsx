"use client";

import { ReactElement, useEffect, useState } from "react";
import SearchGroup from "@/components/molecules/search/employee/bankAccounts/searchGroup";
import ButtonGroup from "@/components/molecules/buttonGroup/employee/bankAccounts/buttonGroup";
import MainInner from "@/components/atoms/div/inner/mainInner";
import EmployeeAccountModalGroup from "@/components/molecules/modalGroup/employee/bankAccounts/employeeAccountModalGroup";
import AccountItemModalGroup from "@/components/molecules/modalGroup/employee/bankAccounts/accountItemModalGroup";
import ProfitModalGroup from "@/components/molecules/modalGroup/employee/bankAccounts/profitModalGroup";
import SuppliersModalGroup from "@/components/molecules/modalGroup/employee/bankAccounts/suppliersModalGroup";
import AuthenticatedLayout from "@/components/molecules/layouts/employee/authenticatedLayout";
import { useIndex as useHubIndex } from "@/hooks/common/hub/useIndex";
import { If, Then } from "react-if";
import TableGroup from "@/components/molecules/tableGroup/employee/bankAccounts/tableGroup";
import FlexWrapper from "@/components/atoms/div/wrapper/flexWrapper";
import { useBankAccounts } from "@/hooks/employee/bankAccounts/useBankAccounts";


export type currentAccessHubType = {
  id: number | null;
  name: string | null;
};


const Template = (): ReactElement => {
  const [ isEmployeeAccountsModalOpen, setEmployeeAccountsModalOpen ] = useState<boolean>(false);
  const [ isAccountItemModalOpen, setAccountItemModalOpen ] = useState<boolean>(false);
  const [ isProfitModalOpen, setProfitModalOpen ] = useState<boolean>(false);
  const [ isSuppliersModalOpen, setSuppliersModalOpen ] = useState<boolean>(false);

  const { getHubs, options: hubsOptions } = useHubIndex();
  const {
    currentAccessHub,
    defaultOption,
    filterListByHubId,
    filteredEmployeeAccounts,
    filteredSubjects,
    filteredProfits,
    filteredSuppliers,
    getEmployeeAccounts,
    getSubjects,
    getProfits,
    getSuppliers,
  } = useBankAccounts();

  useEffect((): void => {
    /** 絞り込みセレクトボックス用 */
    getHubs();
    /** 口座一覧 */
    getEmployeeAccounts();
    /** 科目追加 */
    getSubjects();
    /** 売上科目追加 */
    getProfits();
    /** 取引先一覧 */
    getSuppliers();
  }, [
    getHubs, getEmployeeAccounts, getSubjects, getProfits, getSuppliers,
  ]);

  useEffect((): void => {
    if(!isEmployeeAccountsModalOpen) {
      getEmployeeAccounts();
    }
  }, [ isEmployeeAccountsModalOpen, getEmployeeAccounts ]);

  useEffect((): void => {
    if(!isAccountItemModalOpen) {
      getSubjects();
    }
  }, [ isAccountItemModalOpen, getSubjects ]);

  useEffect((): void => {
    if(!isProfitModalOpen) {
      getProfits();
    }
  }, [ isProfitModalOpen, getProfits ]);

  useEffect((): void => {
    if(!isSuppliersModalOpen) {
      getSuppliers();
    }
  }, [ isSuppliersModalOpen, getSuppliers ]);

  return (
    <>
      <AuthenticatedLayout>
        <MainInner>
          <SearchGroup
            options={hubsOptions}
            defaultOption={defaultOption}
            filterFunction={filterListByHubId}
          />
          <ButtonGroup
            handlePaymentsButtonClick={() => setEmployeeAccountsModalOpen(true)}
            handleAccountItemButtonClick={() => setAccountItemModalOpen(true)}
            handleProfitButtonClick={() => setProfitModalOpen(true)}
            handleSuppliersButtonClick={() => setSuppliersModalOpen(true)}
          />
          <FlexWrapper alignItem={"items-start"}>
            <TableGroup tableHeadText={"口座一覧"} items={filteredEmployeeAccounts} />
            <TableGroup tableHeadText={"科目一覧"} items={filteredSubjects} />
            <TableGroup tableHeadText={"売上科目一覧"} items={filteredProfits} />
            <TableGroup tableHeadText={"取引先一覧"} items={filteredSuppliers} />
          </FlexWrapper>
        </MainInner>
        <If condition={isEmployeeAccountsModalOpen}>
          <Then>
            {/* 口座追加モーダル */}
            <EmployeeAccountModalGroup
              isOpen={isEmployeeAccountsModalOpen}
              handleClose={() => setEmployeeAccountsModalOpen(false)}
              currentAccessHub={currentAccessHub}
            />
          </Then>
        </If>
        <If condition={isAccountItemModalOpen}>
          <Then>
            {/* 科目追加モーダル */}
            <AccountItemModalGroup
              isOpen={isAccountItemModalOpen}
              handleClose={() => setAccountItemModalOpen(false)}
              currentAccessHub={currentAccessHub}
            />
          </Then>
        </If>
        <If condition={isProfitModalOpen}>
          <Then>
            {/* 売上科目追加モーダル */}
            <ProfitModalGroup
              isOpen={isProfitModalOpen}
              handleClose={() => setProfitModalOpen(false)}
              currentAccessHub={currentAccessHub}
            />
          </Then>
        </If>
        <If condition={isSuppliersModalOpen}>
          <Then>
            {/* 取引先追加モーダル */}
            <SuppliersModalGroup
              isOpen={isSuppliersModalOpen}
              handleClose={() => setSuppliersModalOpen(false)}
              currentAccessHub={currentAccessHub}
            />
          </Then>
        </If>
      </AuthenticatedLayout>
    </>
  );
};

export default Template;
