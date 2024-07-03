"use client";

import { ReactElement, useState } from "react";
import SearchGroup from "@/components/molecules/search/employee/sales/searchGroup";
import ButtonGroup from "@/components/molecules/buttonGroup/employee/sales/buttonGroup";
import TableGroup from "@/components/molecules/tableGroup/employee/sales/tableGroup";
import MainInner from "@/components/atoms/div/inner/mainInner";
import ModalGroup from "@/components/molecules/modalGroup/employee/sales/modalGroup";
import AuthenticatedLayout from "@/components/molecules/layouts/employee/authenticatedLayout";

const Template = (): ReactElement => {
  const [ isModalOpen, setModalOpen ] = useState<boolean>(false);

  {
    /* Todo: APIつなぎ込時に動く？ので後ほどClickイベントを設定 */
  }
  const handleCalcButtonClick = () => {
    alert("利益額計算ボタンを押下");
  };

  return (
    <>
      <AuthenticatedLayout>
        <MainInner>
          <SearchGroup />
          <ButtonGroup
            handleModalButtonClick={() => setModalOpen(true)}
            handleCalcButtonClick={handleCalcButtonClick}
          />
          <TableGroup />
        </MainInner>
        <ModalGroup isOpen={isModalOpen} handleClose={() => setModalOpen(false)} />
      </AuthenticatedLayout>
    </>
  );
};

export default Template;
