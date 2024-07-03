"use client";
import { ReactElement, useState } from "react";
import SearchGroup from "@/components/molecules/search/customer/receiveStocks/searchGroup";
import ButtonGroup from "@/components/molecules/buttonGroup/customer/receiveStocks/buttonGroup";
import TableGroup from "@/components/molecules/tableGroup/customer/receiveStocks/tableGroup";
import MainInner from "@/components/atoms/div/inner/mainInner";
import ModalGroup from "@/components/molecules/modalGroup/customer/receiveStocks/modalGroup";
import DeleteModal from "@/components/molecules/modalGroup/customer/receiveStocks/deleteModal";
import AuthenticatedLayout from "@/components/molecules/layouts/customer/authenticatedLayout";

const Template = (): ReactElement => {
  const [ isModalOpen, setModalOpen ] = useState<boolean>(false);
  const [ isDeleteModalOpen, setDeleteModalOpen ] = useState<boolean>(false);
  const handleEditInStockRequest = () => {
    alert("編集を行います");
  };

  return (
    <>
      <AuthenticatedLayout hubCode={""}>
        <MainInner>
          <SearchGroup />
          <ButtonGroup
            handleAddButtonClick={() => setModalOpen(true)}
          />
          <TableGroup handleModalButtonClick={handleEditInStockRequest} handleDeleteColumn={() => setDeleteModalOpen(true)} />
        </MainInner>
        <ModalGroup isOpen={isModalOpen} handleClose={() => setModalOpen(false)} />
        <DeleteModal isOpen={isDeleteModalOpen} handleClose={() => setDeleteModalOpen(false)} />
      </AuthenticatedLayout>
    </>
  );
};

export default Template;
