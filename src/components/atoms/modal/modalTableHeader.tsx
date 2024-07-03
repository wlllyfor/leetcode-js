"use client";

import { ReactElement } from "react";
import { ModalTableHeadingType } from "@/types/components/atoms/modal/ModalTableHeadingType";

const ModalTableHeader = ({
  text,
  textColor = "text-gray-500",
  minWidth,
  isRequired,
}: ModalTableHeadingType): ReactElement => {
  const classNames = `
  py-3 text-start text-sm font-medium uppercase
  ${textColor} ${minWidth}
`;
  return (
    <th
      scope="col"
      className={classNames}
    >
      {text}{isRequired && <span className="text-[#E63B3D]">*</span>}
    </th>
  );
};

export default ModalTableHeader;
