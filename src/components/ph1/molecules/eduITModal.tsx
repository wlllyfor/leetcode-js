"use client";

import Modal from "react-modal";
import { ReactElement, ReactNode } from "react";
import modalClasses from "@/styles/common/modal.module.scss";

Modal.setAppElement("body");

const EduITModal = ({ children, isOpen }: { children: ReactNode; isOpen: boolean; }): ReactElement => {
  return (
    <Modal
      isOpen={isOpen}
      className={`${modalClasses.modal} ${modalClasses.scroll_bar}`}
      overlayClassName={modalClasses.overlay}
    >
      {children}
    </Modal>
  );
};

export { EduITModal };
