"use client";

import Modal from "react-modal";
import { ReactElement } from "react";
import { ModalType } from "@/types/components/atoms/modal/ModalType";

Modal.setAppElement("body");

const ModalSm = ({ children, isOpen, onRequestClose }: ModalType): ReactElement => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={
        onRequestClose as (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void
      }
      className="relative bg-white mx-6 p-6 rounded shadow-lg outline-none overflow-x-hidden overflow-y-auto w-[420px] px-[40px] max-h-[90vh]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center pl-[250px] z-20"
    >
      {children}
    </Modal>
  );
};

export default ModalSm;
