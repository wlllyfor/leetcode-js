"use client";

import { ReactElement, useState } from "react";
import SearchGroup from "@/components/molecules/search/employee/payments/searchGroup";
import ButtonGroup from "@/components/molecules/buttonGroup/employee/payments/buttonGroup";
import TableGroup from "@/components/molecules/tableGroup/employee/payments/tableGroup";
import MainInner from "@/components/atoms/div/inner/mainInner";
import DepositModalGroup from "@/components/molecules/modalGroup/employee/payments/depositModalGroup";
import WithdrawalModalGroup from "@/components/molecules/modalGroup/employee/payments/withdrawalModalGroup";
import AuthenticatedLayout from "@/components/molecules/layouts/employee/authenticatedLayout";

const Template = (): ReactElement => {
  const [ isDepositModalOpen, setDepositModalOpen ] = useState<boolean>(false);
  const [ isWithdrawalModalOpen, setWithdrawalModalOpen ] = useState<boolean>(false);

  return (
    <>
      <AuthenticatedLayout>
        <MainInner>
          <SearchGroup />
          <ButtonGroup
            handleDepositButtonClick={() => setDepositModalOpen(true)}
            handleWithdrawalButtonClick={() => setWithdrawalModalOpen(true)}
          />
          <TableGroup />
        </MainInner>
        <DepositModalGroup isOpen={isDepositModalOpen} handleClose={() => setDepositModalOpen(false)} />
        <WithdrawalModalGroup isOpen={isWithdrawalModalOpen} handleClose={() => setWithdrawalModalOpen(false)} />
      </AuthenticatedLayout>
    </>
  );
};

export default Template;
