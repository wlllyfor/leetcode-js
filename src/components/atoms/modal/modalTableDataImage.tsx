import React, { ReactElement } from "react";
import Image from "next/image";
import { ModalTableDataImageType } from "@/types/components/atoms/modal/ModalTableDataImageType";

const ModalTableDataImage = ({
  imageUrl,
}: ModalTableDataImageType): ReactElement => {
  return (
    <td className="py-4 whitespace-nowrap text-xs text-gray-800 bg-white align-middle">
      <Image src={imageUrl} alt="" width={50} height={33} />
    </td>
  );
};

export default ModalTableDataImage;
