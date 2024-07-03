"use client";

import { ReactElement, useState } from "react";
import SearchGroup from "@/components/molecules/search/employee/payments/searchGroup";
import ButtonGroup from "@/components/molecules/buttonGroup/employee/payments/buttonGroup";
import TableGroup from "@/components/molecules/tableGroup/mock/tableGroup";
import MainInner from "@/components/atoms/div/inner/mainInner";
import DepositModalGroup from "@/components/molecules/modalGroup/employee/payments/depositModalGroup";
import WithdrawalModalGroup from "@/components/molecules/modalGroup/employee/payments/withdrawalModalGroup";

const Template = (): ReactElement => {
  const [ isDepositModalOpen, setDepositModalOpen ] = useState<boolean>(false);
  const [ isWithdrawalModalOpen, setWithdrawalModalOpen ] = useState<boolean>(false);

  return (
    <>
      <MainInner>
        <SearchGroup />
        <ButtonGroup
          handleDepositButtonClick={() => setDepositModalOpen(true)}
          handleWithdrawalButtonClick={() => setWithdrawalModalOpen(true)}
        />
        <TableGroup />
      </MainInner>
      {/* <ModalSmGroup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
      <DepositModalGroup isOpen={isDepositModalOpen} handleClose={() => setDepositModalOpen(false)} />
      <WithdrawalModalGroup isOpen={isWithdrawalModalOpen} handleClose={() => setWithdrawalModalOpen(false)} />
    </>
  );
};

export default Template;
