"use client";

import { ReactElement } from "react";
import { ModalCloseButtonType } from "@/types/components/atoms/modal/ModalCloneButtonType";

const ModalCloseButton = ({ handleClose }: ModalCloseButtonType): ReactElement => {
  return (
    <div className="absolute top-3 right-3">
      <button onClick={handleClose}>
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
};

export default ModalCloseButton;
