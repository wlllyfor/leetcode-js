"use client";

import { ReactElement, useState } from "react";
import SearchGroup from "@/components/molecules/search/employee/products/searchGroup";
import ButtonGroup from "@/components/molecules/buttonGroup/employee/products/buttonGroup";
import TableGroup from "@/components/molecules/tableGroup/employee/products/tableGroup";
import MainInner from "@/components/atoms/div/inner/mainInner";
import ModalGroup from "@/components/molecules/modalGroup/employee/products/modalGroup";
import AuthenticatedLayout from "@/components/molecules/layouts/employee/authenticatedLayout";

const Template = (): ReactElement => {
  const [ isModalOpen, setModalOpen ] = useState<boolean>(false);

  return (
    <>
      <AuthenticatedLayout>
        <MainInner>
          <SearchGroup />
          <ButtonGroup />
          <TableGroup handleEditButtonOnClick={() => setModalOpen(true)} />
        </MainInner>
        <ModalGroup isOpen={isModalOpen} handleClose={() => setModalOpen(false)} />
      </AuthenticatedLayout>
    </>
  );
};

export default Template;
