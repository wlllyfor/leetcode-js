import React, { ReactElement } from "react";
import { ModalTableDataTextType } from "@/types/components/atoms/modal/ModalTableDataTextType";

const ModalTableDataText = ({
  text,
  textColor = "text-[#000]",
}: ModalTableDataTextType): ReactElement => {
  const classNames = `
    py-4 whitespace-nowrap text-xs text-gray-800 bg-white
    align-middle
  `;

  return (
    <td className={classNames}>
      <span className={textColor}>{text}</span>
    </td>
  );
};

export default ModalTableDataText;
